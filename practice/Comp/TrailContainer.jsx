'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap'; // optional: not used in the example but kept if you want to animate later

/**
 * TrailContainer
 * - creates small image containers (stacked mask layers) following the mouse
 * - removes them after imageLifespan
 *
 * Notes:
 * - Provide CSS separately for .trail-container, .trail-img, .mask-layer, .image-layer
 * - Images are expected at /1.jpg ... /10.jpg (or change `images` array)
 */
const TrailContainer = () => {
  const trailContainerRef = useRef(null);    // DOM element
  const trailRef = useRef([]);               // array of active trail items
  const animationFrameRef = useRef(null);    // RAF id
  const currentImageIndexRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const interpolatedMousePosRef = useRef({ x: 0, y: 0 });
  const isDesktopRef = useRef(true);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const config = {
      imageLifespan: 1000,
      mouseThreshold: 150,
      inDuration: 750,
      outDuration: 1000,
      staggerIn: 40,   // per-layer stagger for reveal
      staggerOut: 25,  // per-layer stagger for hide
      slideDuration: 400,
      slideEasing: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      easing: 'cubic-bezier(0.87,0,0.13,1)',
      layerCount: 10,
      layerSize: 175 / 2, // half-size offset (adjust if your image size changes)
    };

    const trailImageCount = 10;
    const images = new Array(trailImageCount).fill(0).map((_, i) => `/${i + 1}.jpg`);

    // utility
    const math = {
      lerp: (a, b, n) => (1 - n) * a + n * b,
      distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
    };

    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return;

    isDesktopRef.current = window.innerWidth > 1000;

    const getMouseDistance = () =>
      math.distance(mousePosRef.current.x, mousePosRef.current.y, lastMousePosRef.current.x, lastMousePosRef.current.y);

    const isInTrailContainer = (x, y) => {
      const rect = trailContainer.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const createTrailImage = () => {
      const rect = trailContainer.getBoundingClientRect();
      const imgSrc = images[currentImageIndexRef.current];
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % trailImageCount;

      // compute start & target relative to container
      const startX = (interpolatedMousePosRef.current.x || mousePosRef.current.x) - rect.left - config.layerSize;
      const startY = (interpolatedMousePosRef.current.y || mousePosRef.current.y) - rect.top - config.layerSize;
      const targetX = mousePosRef.current.x - rect.left - config.layerSize;
      const targetY = mousePosRef.current.y - rect.top - config.layerSize;

      // container for this trail image
      const imgContainer = document.createElement('div');
      imgContainer.className = 'trail-img';
      imgContainer.style.position = 'absolute';
      imgContainer.style.left = `${startX}px`;
      imgContainer.style.top = `${startY}px`;
      imgContainer.style.pointerEvents = 'none';
      imgContainer.style.width = `${config.layerSize * 2}px`;
      imgContainer.style.height = `${config.layerSize * 2}px`;
      imgContainer.style.transform = 'translateZ(0)';

      const maskLayers = [];
      const imageLayers = [];

      for (let i = 0; i < config.layerCount; i++) {
        const layer = document.createElement('div');
        layer.className = 'mask-layer';
        layer.style.position = 'absolute';
        layer.style.left = '0';
        layer.style.right = '0';
        layer.style.top = '0';
        layer.style.bottom = '0';
        layer.style.overflow = 'hidden';
        layer.style.transform = 'translateZ(0)';
        // initial clip-path: collapsed vertical slice in the middle
        const startPct = 50;
        layer.style.clipPath = `polygon(${startPct}% 0%, ${startPct}% 0%, ${startPct}% 100%, ${startPct}% 100%)`;

        const imageLayer = document.createElement('div');
        imageLayer.className = 'image-layer';
        imageLayer.style.position = 'absolute';
        imageLayer.style.left = '0';
        imageLayer.style.top = '0';
        imageLayer.style.width = '100%';
        imageLayer.style.height = '100%';
        imageLayer.style.backgroundImage = `url(${imgSrc})`;
        imageLayer.style.backgroundSize = 'cover';
        imageLayer.style.backgroundPosition = 'center';
        imageLayer.style.opacity = '1';
        imageLayer.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;

        layer.appendChild(imageLayer);
        imgContainer.appendChild(layer);

        maskLayers.push(layer);
        imageLayers.push(imageLayer);
      }

      // append to container
      trailContainer.appendChild(imgContainer);

      // force reflow then move and animate the clip paths
      requestAnimationFrame(() => {
        imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;
        imgContainer.style.left = `${targetX}px`;
        imgContainer.style.top = `${targetY}px`;

        maskLayers.forEach((layer, i) => {
          const startY = i * (100 / config.layerCount);
          const endY = (i + 1) * (100 / config.layerCount);
          const distanceFromMiddle = Math.abs(i - (config.layerCount - 1) / 2);
          const delay = distanceFromMiddle * config.staggerIn;
          setTimeout(() => {
            // expand this slice horizontally (left-to-right full width)
            layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
            layer.style.clipPath = `polygon(0% ${startY}%, 100% ${startY}%, 100% ${endY}%, 0% ${endY}%)`;
          }, delay);
        });
      });

      // push to trailRef for later removal
      trailRef.current.push({
        element: imgContainer,
        maskLayers,
        imageLayers,
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      // iterate from front and remove expired items
      while (trailRef.current.length > 0 && now >= trailRef.current[0].removeTime) {
        const imgToRemove = trailRef.current.shift();
        // animate clip-path back to middle and fade images
        imgToRemove.maskLayers.forEach((layer, i) => {
          const startY = i * (100 / config.layerCount);
          const endY = (i + 1) * (100 / config.layerCount);
          const distanceFromEdge = (config.layerCount - 1) / 2 - Math.abs(i - (config.layerCount - 1) / 2);
          const delay = distanceFromEdge * config.staggerOut;
          setTimeout(() => {
            layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
            layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;
          }, delay);
        });

        imgToRemove.imageLayers.forEach((imageLayer) => {
          // fade a bit
          imageLayer.style.opacity = '0.25';
        });

        // actually remove DOM after outDuration + a small buffer
        setTimeout(() => {
          if (imgToRemove.element && imgToRemove.element.parentNode) {
            imgToRemove.element.parentNode.removeChild(imgToRemove.element);
          }
        }, config.outDuration + 80);
      }
    };

    // main render loop (interpolation + removal)
    const render = () => {
      // interpolate mouse
      interpolatedMousePosRef.current.x = math.lerp(
        interpolatedMousePosRef.current.x || mousePosRef.current.x,
        mousePosRef.current.x,
        0.12
      );
      interpolatedMousePosRef.current.y = math.lerp(
        interpolatedMousePosRef.current.y || mousePosRef.current.y,
        mousePosRef.current.y,
        0.12
      );

      removeOldImages();

      // schedule next frame only if we have active trail items or animation is running
      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Mouse move handler
    const onMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // ensure it's inside container
      if (!isInTrailContainer(e.clientX, e.clientY)) return;

      const distance = getMouseDistance();

      // create new trail image only if movement is significant
      if (distance > config.mouseThreshold) {
        createTrailImage();
        lastMousePosRef.current = { ...mousePosRef.current };
      }

      // start RAF loop if not started
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
      }

      // reset idle timer to stop RAF after a while of inactivity
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        // no movement recently: stop RAF (but keep DOM elements so they finish their lifecycle)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }, 800);
    };

    // resize handler to toggle desktop/mobile behavior
    const onResize = () => {
      const wasDesktop = isDesktopRef.current;
      isDesktopRef.current = window.innerWidth > 1000;

      if (!wasDesktop && isDesktopRef.current) {
        // became desktop: add listener if not present
        window.addEventListener('mousemove', onMouseMove);
      } else if (wasDesktop && !isDesktopRef.current) {
        // left desktop: remove listener and clear items
        window.removeEventListener('mousemove', onMouseMove);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        // clear DOM trail
        trailRef.current.forEach((item) => {
          if (item.element && item.element.parentNode) item.element.parentNode.removeChild(item.element);
        });
        trailRef.current.length = 0;
      }
    };

    // attach handlers (only on desktop)
    if (isDesktopRef.current) window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      // remove any remaining DOM nodes
      trailRef.current.forEach((item) => {
        if (item.element && item.element.parentNode) item.element.parentNode.removeChild(item.element);
      });
      trailRef.current.length = 0;
    };
  }, []);

  return (
    <div
      ref={trailContainerRef}
      className="trail-container absolute inset-0"
      
    >
      {/* the actual trail DOM nodes are appended to this element */}
    </div>
  );
};

export default TrailContainer;
