import React from 'react'
import TrailContainer from './TrailContainer'
import { Button } from '@/components/ui/button'

const CompNex = () => {
  return (
    <>
    <section className='hero flex justify-center items-center'>
      
      <div className='flex flex-col gap-8'>
        <h1 className="h1 !text-7xl text-center !font-[600]  bg-gradient-to-r from-[rgba(229,255,249,0.5)] via-[rgba(229,255,249,1)] to-[rgba(229,255,249,0.5)] bg-clip-text text-transparent">Design products <br /><span className='text-primary-300 upp'> people love</span></h1>


        
        <p className=' max-w-[650px] text-text-100/50 !text-[1rem] text-center leading-relaxed'
      >We help startups and SaaS companies turn bold ideas into intuitive, user-friendly products. From UX audits to polished design systems, we design experiences that delight users and scale with your business.</p>

      <Button
            
       className="bg-primary-300 hover:bg-primary-500 text-primary-foreground px-10 py-10 rounded-3xl  text-xl text-darkGreen-800/80 font-bold w-fit mx-auto tracking-widest"
        >
                    See our work
        </Button>
      </div>
      
      

      <TrailContainer/>
    </section>
    </>
  )
}

export default CompNex