import About from "@/Comp/About"
import CompNex from "@/Comp/CompNex"
import Contact from "@/Comp/Contact"
import Footer from "@/Comp/Footer"
import HeroSection from "@/Comp/HeroSection"
import Nav from "@/Comp/Nav"
import PinSection from "@/Comp/PinSection"
import Service from "@/Comp/Service"
import SplitTxt from "@/Comp/SplitTxt"
import TestimonialUser from "@/Comp/TestimonialUser"


const page = () => {



  return (
    <>
    <Nav/>
    <CompNex/>
    <About/>
    <PinSection/>
    <TestimonialUser/>
    <Contact/>
    <Footer/>
    </>

  )
}

export default page