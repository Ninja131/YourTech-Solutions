'use client'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText'; 
import { useEffect } from 'react';
const SplitTxt = () => {
    
    useEffect(() => {
    
      SplitText.create(".split", {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            duration: 1, 
            y: 100, 
            autoAlpha: 0, 
            stagger: 0.01,
          });
        }
      });

      return () => {
    
      }
    }, [])
    
  return (
    <>
    <section className='border-red flex items-center justify-center'>
      <div  className='border-red max-w-fit'>
        <h1 className='text-amber-800 text-4xl font-bold split'>
        this is a paragraph <br />
        which means nothing <br />
        don't think much
        </h1>
      </div>
    </section>
    </>
  )
}

export default SplitTxt