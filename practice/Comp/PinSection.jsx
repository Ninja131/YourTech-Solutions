'use client'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText'; 
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from 'react';

const PinSection = () => {
  gsap.registerPlugin(ScrollTrigger);
  const pinSection = useRef(null);
  const clipImg = useRef(null);
  const col1 = useRef(null);
  const col2 = useRef(null);
  const col3 = useRef(null);
  const col4 = useRef(null);
  const text1 = useRef([]);
  const text2 = useRef([]);
  const text3 = useRef([]);
  const sec1 = useRef(null);
  const text2Hidden = useRef(null);

  const phase = useRef(0);



    useEffect(() => {
      
      // smooth scroll code
       const lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);





      // here to the component positions
      gsap.set(clipImg.current,{
        clipPath:'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',

      })

      gsap.set(col2.current,{
        xPercent:100
      });
      gsap.set(col3.current,{
        xPercent:100,
        yPercent:100
      })
      gsap.set(col4.current,{
        xPercent:100,
        yPercent:100
      })
      ///////////// gsap animations that will be caleed above //////////////
      
      // phase one animations
      const col1P1f = gsap.to(col1.current,{
        scale:0.75,
        ease:"power1.inOut",
        paused:true,
        duration:0.75,
       
        });

      const col2P1f = gsap.to(col2.current,{
        xPercent:0,
        ease:"power1.inOut",
        duration:0.75,
        paused:true,
      });

      const col3P1f = gsap.to(col3.current,{
        yPercent:0,
        ease:"power1.inOut",
        duration:0.75,
        paused:true,
      });

      const imgClipP1f = gsap.to(clipImg.current,{
        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
        ease:"power1.inOut",
        duration:0.75,
        paused:true,

      });

      //phase two animations
      const col2P2f = gsap.to(col2.current,{
        scale:0.75,
        ease:"power1.inOut",
        duration:0.75,
        paused:true,
       
        });

        const col3P2f = gsap.to(col3.current,{
        xPercent:0,
        ease:"power1.inOut",
        duration:0.75,
        paused:true,
      });
       
       const col4P2f = gsap.to(col4.current,{
        yPercent:0,
        ease:"power1.inOut",
        duration:0.75,
        paused:true,
       })

       // add text animations
       gsap.registerPlugin(SplitText);

      // animate words on scroll/////////////////////////////////
       let split = text1.current.map((el)=>
        new SplitText(el,{
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
       })
      );

       split.forEach(el=>{
        gsap.from(el.words,{
        duration:1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger:{
          trigger:text1.current,
          start:'center 80%',
          toggleActions: "play none none reverse",
        }
       });
       });

       const text1A = split.map((el)=>
        gsap.from(el.words,{
        duration:1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
        paused:true,
       })
      )


       let split2 = text2.current.map((el)=>
        new SplitText(el,{
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
       })
      );



     const split2A= split2.map((el)=>
        gsap.from(el.words,{
        duration:1,
        y: 100,
        autoAlpha:0,
        ease: "power2.out",
        paused:true,
        stagger: 0.05,
       })
       );

       let split3 = text3.current.map((el)=>
        new SplitText(el,{
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
       })
      );

      const split3A= split3.map((el)=>
        gsap.from(el.words,{
        duration:1,
        y: 100,
        autoAlpha:0,
        ease: "power2.out",
        paused:true,
        stagger: 0.05
       })
       );


       const text2HiddenA = gsap.to(
        text2Hidden.current,{
          opacity:0,
          duration:0.2,
          paused:true,

        }
       )


   



      // this is the next code
      
      ScrollTrigger.create({
        trigger:'.pinSection',
        top: 'top top',
        end:`+=${window.innerHeight*5}px`,
        pin:true,
        pinSpacing: true,
        id: "pin-section", // Add unique ID
        onUpdate:(self)=>{
          let progress = self.progress;
          
          

          if (progress >= 0.25 && phase.current < 1) {
              phase.current = 1;
              col1P1f.play();
              col2P1f.play();
              col3P1f.play();
              imgClipP1f.play();
              split3A.forEach((el)=>{
                el.play();
              });
              
            }

            if (progress >= 0.5 && phase.current < 2) {
              phase.current = 2;
              col2P2f.play();
              col3P2f.play();
              col4P2f.play();
              split2A.forEach((el)=>{
                el.play();
              });
              split3A.forEach((el)=>{
                el.reverse();
              });
              text2HiddenA.play();
              
            }

            if (progress < 0.5 && phase.current === 2) {
              phase.current = 1;
              col2P2f.reverse();
              col3P2f.reverse();
              col4P2f.reverse();
              split2A.forEach((el)=>{
                el.reverse();
              });
              split3A.forEach((el)=>{
                el.play();
              });
              text2HiddenA.reverse();
            }

            if (progress < 0.25 && phase.current === 1) {
              phase.current = 0;
              col1P1f.reverse();
              col2P1f.reverse();
              col3P1f.reverse();
              imgClipP1f.reverse();
            }


        }
      })



      
      


    return () => {
    };
  }, []);



  return (
        <>
        
        <ScrollSection
        pinSection={pinSection}
        clipImg = {clipImg}
        col1={col1}
        col2={col2}
        col3={col3}
        col4={col4}
        text1={text1}
        text2={text2}
        text3 ={text3}
        text2Hidden={text2Hidden}
        />
        
        </>
        
  )
}

export default PinSection







//const section
const Section = ({sec1})=>{
  return(
    <>
      <section ref={sec1} className='text-2xl text-white flexCenter w-dvw h-dvh border-red'>
          <h1 className=''>this is a dummy section</h1>
        </section>
    </>
  )
}



// const scroll section
const ScrollSection = ({clipImg,pinSection,col1,col2,col3,col4,text1,text2,text3,text2Hidden})=>{
  return(
    <>
      <section
       ref={pinSection}
       className='pinSection text- flexCenter w-dvw h-dvh   p-1 '>
          {/* stickey Wrapper */}
          <div className='w-full h-full relative '>

            
            {/* col-1 starts here */}
            <div className="col col-1 z-1 p-2 " ref={col1}>
              <div className='w-full h-full '>
                <div className='px-10 py-10 w-full  h-full  flex flex-col justify-between bg-foreGround-700 rounded-4xl overflow-hidden '>
                  <h1 className='text-text-100/80 lg:w-[600px] text-4xl lg:text-5xl font-bold ' 
                  ref={(el)=>(text1.current[0]=el)}> Design System</h1>
                   <p
                    ref={(el)=>(text1.current[1]=el)}
                    className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-text-100/80'>We build scalable design systems with reusable components, helping your team design faster while staying consistent.</p>
                </div>
              </div>
            </div>




            {/* col-2 starts here */}
            <div className="col col-2 relative z-10 " ref={col2}>
              <div className='w-full h-full  p-2'>
                {/* img 1 wrapper */}
                <div className='bg-foreGround-700 w-full h-full rounded-4xl overflow-hidden '>
                  <img src="/s1.jpg" alt="" className='w-full h-full object-cover'/>
                </div>
              </div>


              <div className='absolute inset-0 p-2 '>
                 {/* img 2 wrapper  this going to be clipped */}
                <div className='img-2 bg-foreGround-700 w-full h-full rounded-4xl overflow-hidden ' 
                ref={clipImg}>
                  
                <img 
                src="/s2.jpg" alt="" className='w-full h-full object-cover'/>
              </div>
              </div>

              
              
            </div>




            {/* col-3 starts here */}
            <div className="col col-3  relative z-20" ref={col3}>

              {/* text one starts here */}
                <div className='w-full h-full p-2'>
                <div className='px-6 py-6 w-full  h-full  flex flex-col justify-between bg-foreGround-700 rounded-4xl overflow-hidden '>
                  <h1
                  ref={(el)=> text2.current[0]=el}
                   className='text-text-100/80 lg:w-[600px] text-4xl lg:text-5xl font-bold'> UX Audits & Testing</h1>
                   <p
                   ref={(el)=> text2.current[1]=el}
                    className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-text-100/80'>We spot friction in your product through audits and real user testing. The result: clear fixes that make your product easier and more enjoyable.</p>
                </div>
              </div>

              {/* text two starts here */}
              <div
              ref={text2Hidden}
               className='w-full h-full p-2   absolute inset-0'>
                <div className='px-6 py-6 w-full  h-full  flex flex-col justify-between bg-foreGround-700 rounded-4xl overflow-hidden '>
                  <h1 
                  ref={(el)=> text3.current[0]=el}
                  className='text-text-100/80 lg:w-[600px] text-4xl lg:text-5xl font-bold'> Product Design & Prototyping</h1>
                   <p 
                   ref={(el)=> text3.current[1]=el}
                   className='text-[1rem] leading-relaxed font-light lg:w-[580px] text-text-100/80'>From wireframes to polished prototypes, we design products that look great and work seamlessly—ready to scale with your business.</p>
                </div>
              </div>

            </div>




            {/* col-4 starts here */}
            <div className="col col-4 " ref={col4}>
              <div className=' p-2 w-full h-full'>
                 {/* img 2 wrapper  this going to be clipped */}
                <div className='bg-foreGround-700 w-full h-full rounded-4xl overflow-hidden '>
                <img src="/s3.jpg" alt="" className='w-full h-full object-cover'/>
              </div>
              </div>
            </div>

          </div>
        </section>
    </>
  )
}





