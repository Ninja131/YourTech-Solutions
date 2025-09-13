'use client'
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';

const HeroSection = () => {
  useEffect(() => {
    gsap.registerPlugin(Flip, SplitText);

    // Counter setup to display 001 to 100
    const createCounterDigits = () => {
      const counters = [
        document.querySelector('.counter-1'),
        document.querySelector('.counter-2'),
        document.querySelector('.counter-3'),
      ];

      // Counter 1: Hundreds digit (0 to 1)
      const counter1 = counters[0];
      for (let i = 0; i <= 1; i++) {
        const numDiv = document.createElement('div');
        numDiv.className = 'num';
        numDiv.textContent = i;
        counter1.appendChild(numDiv);
      }

      // Counter 2 & 3: Tens and Units digits (0 to 9, repeated for smooth looping)
      [counters[1], counters[2]].forEach((counter, index) => {
        for (let i = 0; i <= 19; i++) {
          const numDiv = document.createElement('div');
          numDiv.className = 'num';
          numDiv.textContent = i % 10;
          counter.appendChild(numDiv);
        }
      });
    };

    const animateCounter = (counter, targetNum, duration, delay = 0) => {
      const numHeight = counter.querySelector('.num')?.clientHeight || 120;
      const nums = counter.querySelectorAll('.num');
      if (!nums.length) return;

      const totalDistance = targetNum * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: 'power2.inOut',
      });
    };

    const animateImages = () => {
      const images = document.querySelectorAll('.img');
      const imagesContainer = document.querySelector('.images-container');
      if (!images.length || !imagesContainer) return null;

      const state = Flip.getState(images);

      images.forEach((img) => {
        img.classList.add('animate-out');
      });

      const mainTimeline = gsap.timeline({
        onComplete: () => {
          imagesContainer.style.position = 'fixed';
          imagesContainer.style.bottom = '0';
          imagesContainer.style.right = '0';
          imagesContainer.style.width = '25%'; // Match original size or adjust proportionally
          imagesContainer.style.height = '25%'; // Match original size or adjust proportionally
          imagesContainer.style.zIndex = '10'; // Ensure it stays above other elements
          images.forEach((img) => {
            img.style.position = 'absolute';
            img.style.bottom = '0';
            img.style.right = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
          });
        },
      });

      images.forEach((img, index) => {
        const imageTimeline = gsap.timeline();
        imageTimeline
          .add(
            Flip.from(state, {
              targets: img,
              duration: 1,
              ease: 'power3.inOut',
              absolute: true,
            }),
            0
          )
          .to(
            img,
            {
              scale: 2.5,
              duration: 0.5,
              ease: 'power3.in',
            },
            0
          )
          .to(
            img,
            {
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
            },
            0.5
          );
        mainTimeline.add(imageTimeline, index * 0.1);
      });

      return mainTimeline;
    };

    // Initialize animations
    createCounterDigits();
    animateCounter(document.querySelector('.counter-1'), 1, 2, 1.5);
    animateCounter(document.querySelector('.counter-2'), 10, 3);
    animateCounter(document.querySelector('.counter-3'), 10, 2.5);

    const tl = gsap.timeline();
    gsap.set('.img', { scale: 0 });
    gsap.set('.logo', { scale: 0, top: 0, left: 0 });

    tl.to('.hero-bg', {
      scaleY: 1,
      duration: 3,
      ease: 'power1.inOut',
      delay: 0.25,
    });

    tl.to('.img', {
      scale: 1,
      duration: 1,
      stagger: 0.125,
      ease: 'power3.out',
    }, '<');

    tl.to('.counter', {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.inOut',
      onStart: () => {
        animateImages();
      },
    });

    tl.to('.sidebar .divider', {
      scaleY: 1,
      duration: 1,
      ease: 'power3.inOut',
      delay: 1.25,
    });

    tl.to(
      ['nav .divider', '.site-info .divider'],
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.5,
        ease: 'power3.inOut',
      },
      '<'
    );

    tl.to('.logo', {
      scale: 1,
      duration: 1,
      ease: 'power4.inOut',
    }, '<');

    tl.to(
      ['.logo-name a', '.links a', '.cta a'],
      {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5,
      },
      '<'
    );

    tl.to(
      ['.header h1', '.site-info h2', '.site-info-copy p', '.hero-footer h2'],
      {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      },
      '<'
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(['.hero-bg', '.img', '.counter', '.sidebar .divider', 'nav .divider', '.site-info .divider', '.logo', '.logo-name a', '.links a', '.cta a', '.header h1', '.site-info h2', '.site-info-copy p', '.hero-footer h2']);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg"></div>

      <div className="counter">
        <div className="counter-1 digit"></div>
        <div className="counter-2 digit"></div>
        <div className="counter-3 digit"></div>
      </div>

      <div className="images-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="img w-full h-full object-cover" key={index}>
            <img src={`/${index + 1}.jpg`} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

      <nav className=''>
        <div className="logo-name ">
          <a href="#">YourTech</a>
        </div>
        <div className="nav-items">
          <div className="links">
            <a href="#">Portfolio</a>
            <p>/</p>
            <a href="#">About</a>
          </div>
          <div className="cta">
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="divider"></div>
      </nav>

      <div className="sidebar ">
        <div className='logo '>
          <img src="/1.jpg" alt="Logo" />
        </div>
        <div className="divider"></div>
      </div>

      <div className="header">
        <h1>Visual engineering for modern brands</h1>
      </div>

      <div className="site-info">
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
        <div className="divider"></div>
        <div className="site-info-copy">
          <p>Lorem ipsum dolor, sit amet consectetur</p>
          <p>Lorem ipsum dolor</p>
        </div>
      </div>

      <div className="hero-footer">
        <h2>Watch Showreel</h2>
      </div>
    </section>
  );
};

export default HeroSection;