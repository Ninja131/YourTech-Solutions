'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Create SplitText instance to split text into characters
    const split = new SplitText(textRef.current, { type: 'chars words' });
    const chars = split.chars; // Array of character elements

    // Create GSAP animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        pin:true,
        trigger: sectionRef.current, 
        start: 'top top', 
        end: `+=${window.innerHeight*3}`, 
        scrub: true,
         
        
      },
    });

   
    tl.from(chars, {
      opacity: 0,
      stagger: 0.05, 
      duration: 1,
    });

   
    return () => {
      tl.kill(); 
      split.revert(); 
    };
  }, []);

  return (
    <section
    ref={sectionRef}
     className="h-[100vh] w-full px-10 flex items-center justify-center mx-auto ">
      <p ref={textRef} className="!text-white !text-4xl  !font-[600] text-center leading-relaxed max-w-[800px]">
       At YourTech Solutions, we design digital products that don’t just look good—they <span className='text-primary-300'>grow businesses.</span> Our team specializes in <span className='text-primary-300'>  UX audits</span> , 

       <span className='text-primary-300'>  prototyping</span> 
       , and
       <span className='text-primary-300'>   usability 
       testing </span> 
        to help startups scale with 
        <span className='text-primary-300'>   confidence </span>
      </p>
    </section>
  );
};

export default About;