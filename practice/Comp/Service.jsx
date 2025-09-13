'use client'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText'; 
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from 'react';
import './service.css';

const Service = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const stickyCols = useRef(null);
  const imgTwo = useRef(null);
  const col1 = useRef(null);
  const col2 = useRef(null);
  const col3 = useRef(null);
  const col4 = useRef(null);
  const text1 = useRef([]);
  const text2 = useRef([]);
  const text3 = useRef([]);
  const phase = useRef(0);

  useEffect(() => {
    // Smooth scroll setup with Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(2, -10 * t), // Exponential ease-out
      smoothWheel: true,
      smoothTouch: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Initial GSAP setup
    gsap.set(imgTwo.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
    gsap.set(col2.current, {
      xPercent: 100,
    });
    gsap.set(col3.current, {
      xPercent: 100,
      yPercent: 100,
    });
    gsap.set(col4.current, {
      xPercent: 100,
      yPercent: 100,
    });

    // Phase 1 animations
    const col1P1 = gsap.to(col1.current, {
      scale: 0.75,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    const col2P1 = gsap.to(col2.current, {
      xPercent: 0,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    const col3P1 = gsap.to(col3.current, {
      yPercent: 0,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    const imgClipP1 = gsap.to(imgTwo.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    // Phase 2 animations
    const col2P2 = gsap.to(col2.current, {
      scale: 0.75,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    const col3P2 = gsap.to(col3.current, {
      xPercent: 0,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    const col4P2 = gsap.to(col4.current, {
      yPercent: 0,
      ease: "power1.inOut",
      duration: 0.75,
      paused: true,
    });

    // Text animations with SplitText
    let split1 = text1.current.map((el) =>
      new SplitText(el, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
      })
    );

    const text1Anim = split1.map((el) =>
      gsap.from(el.words, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
        paused: true,
      })
    );

    let split2 = text2.current.map((el) =>
      new SplitText(el, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
      })
    );

    const text2Anim = split2.map((el) =>
      gsap.from(el.words, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
        paused: true,
      })
    );

    let split3 = text3.current.map((el) =>
      new SplitText(el, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
      })
    );

    const text3Anim = split3.map((el) =>
      gsap.from(el.words, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
        paused: true,
      })
    );

    // ScrollTrigger setup
    ScrollTrigger.create({
      trigger: '.sticky-cols',
      start: 'top top',
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      id: "sticky-cols",
      onUpdate: (self) => {
        let progress = self.progress;

        if (progress >= 0.25 && phase.current < 1) {
          phase.current = 1;
          col1P1.play();
          col2P1.play();
          col3P1.play();
          imgClipP1.play();
          text1Anim.forEach((el) => el.play());
        }

        if (progress >= 0.5 && phase.current < 2) {
          phase.current = 2;
          col2P2.play();
          col3P2.play();
          col4P2.play();
          text2Anim.forEach((el) => el.play());
          text1Anim.forEach((el) => el.reverse());
        }

        if (progress < 0.5 && phase.current === 2) {
          phase.current = 1;
          col2P2.reverse();
          col3P2.reverse();
          col4P2.reverse();
          text2Anim.forEach((el) => el.reverse());
          text1Anim.forEach((el) => el.play());
        }

        if (progress < 0.25 && phase.current === 1) {
          phase.current = 0;
          col1P1.reverse();
          col2P1.reverse();
          col3P1.reverse();
          imgClipP1.reverse();
          text1Anim.forEach((el) => el.reverse());
        }
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Section />
      <ScrollSection
        stickyCols={stickyCols}
        imgTwo={imgTwo}
        col1={col1}
        col2={col2}
        col3={col3}
        col4={col4}
        text1={text1}
        text2={text2}
        text3={text3}
      />
      <Section />
    </>
  );
};

const Section = () => {
  return (
    <section className='text-2xl text-white flex items-center justify-center w-screen h-screen'>
      <h1>This is a dummy section</h1>
    </section>
  );
};

const ScrollSection = ({ stickyCols, imgTwo, col1, col2, col3, col4, text1, text2, text3 }) => {
  return (
    <section ref={stickyCols} className='sticky-cols text-white flex items-center justify-center w-screen h-screen p-1'>
      <div className='w-full h-full relative'>
        {/* Col-1 */}
        <div className="col col-1 z-1 p-2" ref={col1}>
          <div className='w-full h-full'>
            <div className='px-10 py-10 w-full h-full flex flex-col justify-between bg-[#282828] rounded-4xl overflow-hidden'>
              <h1
                ref={(el) => (text1.current[0] = el)}
                className='text-white/80 lg:w-[600px] text-4xl lg:text-5xl font-bold'
              >
                We design spaces where comfort meets quiet sophistication
              </h1>
              <p
                ref={(el) => (text1.current[1] = el)}
                className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-white/60'
              >
                Layered textures, rich tones is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>

        {/* Col-2 */}
        <div className="col col-2 relative z-10" ref={col2}>
          <div className='w-full h-full p-2'>
            <div className='bg-[#282828] w-full h-full rounded-4xl overflow-hidden'>
              <img src="/s1.jpg" alt="" className='w-full h-full object-cover' />
            </div>
          </div>
          <div className='absolute inset-0 p-2'>
            <div ref={imgTwo} className='bg-[#282828] w-full h-full rounded-4xl overflow-hidden'>
              <img src="/s2.jpg" alt="" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>

        {/* Col-3 */}
        <div className="col col-3 relative z-20" ref={col3}>
          <div className='w-full h-full p-2'>
            <div className='px-6 py-6 w-full h-full flex flex-col justify-between bg-[#282828] rounded-4xl overflow-hidden'>
              <h1
                ref={(el) => (text2.current[0] = el)}
                className='text-white/80 lg:w-[600px] text-4xl lg:text-5xl font-bold'
              >
                Our interiors are crafted to feel as calm as they look
              </h1>
              <p
                ref={(el) => (text2.current[1] = el)}
                className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-white/60'
              >
                Layered textures, rich tones is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
          <div className='w-full h-full p-2 absolute inset-0'>
            <div className='px-6 py-6 w-full h-full flex flex-col justify-between bg-[#282828] rounded-4xl overflow-hidden'>
              <h1
                ref={(el) => (text3.current[0] = el)}
                className='text-white/80 lg:w-[600px] text-4xl lg:text-5xl font-bold'
              >
                Every detail is chosen to bring ease and comfort into your space
              </h1>
              <p
                ref={(el) => (text3.current[1] = el)}
                className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-white/60'
              >
                Layered textures, rich tones is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>

        {/* Col-4 */}
        <div className="col col-4" ref={col4}>
          <div className='p-2 w-full h-full'>
            <div className='bg-[#282828] w-full h-full rounded-4xl overflow-hidden'>
              <img src="/s3.jpg" alt="" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;