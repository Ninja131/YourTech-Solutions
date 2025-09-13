"use client"

import { useState } from "react"
import QuoteIcon from "@/public/icons/Quote"
import StarIcon from "@/public/icons/StarIcon"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { testimonials } from "@/constants"



const TestimonialUser = () => {
  const [state, setState] = useState({
  review: testimonials[0].review,
  number: 0 // or any initial number value you want
});

  

  function handeClick(t,idx){
    console.log('click');
        setState(prev=>({...prev, review:t.review,number:idx}));
        console.log(idx);
  }

  return (
    <section className=" px-4 mx-auto py-24 mt-40">
      <div className="flex flex-col gap-8 justify-center items-start">
        <h2 className="h2 text-text-100/50 w-full text-center text-4xl">
          Real Stories. Real Bookings. Real Trust.
        </h2>

        {/* grid starts here */}
        <div className=" w-full lg:grid lg:grid-cols-12 gap-4">
          {/* left box */}


          <div className=" px-2 col-span-12 lg:col-span-9 min-h-120 bg-foreGround-700 rounded-3xl flex items-center justify-center max-lg:mb-4 relative  max-md:!hidden    ">
            <QuoteIcon className="absolute text-teal-100/2 rotate-180 top-16 left-16" />
            <QuoteIcon className="absolute text-teal-100/2 right-16 bottom-16" />

            <div className="flex flex-col justify-center items-center gap-4 ">
              <div className="flex gap-4 relative">
                {Array(5)
                  .fill(1)
                  .map((_, i) => (
                    <StarIcon key={i} />
                  ))}
              </div>
              <h3 className="h3 text-grayMain-100 text-center max-w-[560px] relative text-3xl font-[600] leading-normal text-text-100/80 ">
                {state.review}
              </h3>
            </div>
          </div>

          {/* right box */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4  ">
            {testimonials.map((t, idx) => (
              <Card
              
                key={idx}
                profile={t.profile}
                name={t.name}
                profession={t.profession}
                review={t.review}

                onClick={()=> handeClick(t,idx)}
                isSelected = {state.number===idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialUser

const Card = ({ profile, name, profession, review, onClick, isSelected}) => {
  


  return (
    <Accordion
      type="single"
      collapsible
      className={`w-full px-4 py-1 bg-foreGround-700 ${isSelected? 'border-4 border-primary-500/80':''} rounded-xl`}
      
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          onClick={onClick}
          className="lg:[&>svg]:hidden " // hide chevron on lg+
        >
          <div className="flex gap-4  w-full  ">
            <div className="h-15 w-15 relative rounded-full overflow-hidden">
              <Image
              src={profile}
              alt="profile"
              fill
              className="object-cover w-10 h-10"
            />
            </div>
            <div>
              <h6 className={`title  text-teal-100 text-[1.25rem]`}>{name}</h6>
              <p className={`body text-teal-100/40 text-[1rem]`}>{profession}</p>
            </div>
          </div>
          
        </AccordionTrigger>

        {/* Show review text ONLY on mobile/tablet */}
        <AccordionContent className="flex flex-col gap-4 text-balance block lg:hidden">
          <p className="text-white">{review}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}