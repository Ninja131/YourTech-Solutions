import FacebookIcon from "@/public/icons/FacebookIcon"
import InstagramIcon from "@/public/icons/InstagramIcon"
import YourTech from "@/public/icons/YourTechLogo"
import WhatsappIcon from "@/public/icons/WhatsappIcon"
import XIcon from "@/public/icons/XIcon"


const Footer = () => {
  return (
    <footer className="  flexCenter lg:px-4 my-24 max-lg:mx-4">

        <div className="w-full   flex flex-col justify-between items-center rounded-4xl bg-foreGround-700 ">
            <div className=" px-4 py-16  lg:px-22 w-full text-text-100/80">

            {/* top container */}
            <div className="  flex flex-col md:flex-row justify-between w-full  ">
                {/* logoholder */}
                <div className="flex gap-2 items-center">

                
                <div className="h-22 w-22 flex justify-center items-center bg-primary-500 rounded-xl">
                    <YourTech className='text-white/90'/>
                </div>
                <h3 className="h3 text-3xl font-[800] text-grayMain-800 max-w-45">YourTech <br /> Solutions</h3>
                </div>

                {/* links holder */}
                <div className="flex max-sm:flex-col gap-20 md:px-4  max-md:mt-4">


                    <div className="flex flex-col gap-1 ">
                        <h6 className="title text-grayMain-700">Explore</h6>
                        <p className="body-sm text-grayMain-600">About YourTech</p>
                        <p  className="body-sm text-grayMain-600">Pricing Plans</p>
                        <p className="body-sm text-grayMain-600">Carreer</p>
                        <p className="body-sm text-grayMain-600">How It Works</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h6 className="title text-grayMain-700">Our Services</h6>
                        <p className="body-sm text-grayMain-600">Design</p>
                        <p className="body-sm text-grayMain-600">Development</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h6 className="title text-grayMain-700">Support & Tools</h6>
                        <p className="body-sm text-grayMain-600" >Usablity Checker</p>
                        <p className="body-sm text-grayMain-600" >Accessability Checker</p>
                        <p  className="body-sm text-grayMain-600" >Devlop with Ai</p>
                    </div>


                </div>
            </div>


            {/* bottom container */}
            <div className="flex justify-between w-full mt-40 max-sm:flex-col max-md:gap-4">

                <div className="w-full flex max-md:flex-col  max-md:gap-4">
                <p className="body-sm text-grayMain-600 w-[200px]">© 2025 YOURTECH SOLUTIONS</p>


                <div className=" flex gap-8 w-full justify-center max-md:justify-start ">
                    <p className="body-sm text-grayMain-600">Privacy Policy</p>
                    <p className="body-sm text-grayMain-600">Terms & Conditions</p>
                </div>

                </div>



                <div className=" flex gap-4">

                    <div className=" h-12 w-12 flexCenter bg-primary-50 rounded-sm">
                        <XIcon className='text-grayMain-700 fill-amber-20'/>
                    </div>
                    <div className=" h-12 w-12 flexCenter bg-primary-50 rounded-sm">
                        <InstagramIcon className='text-grayMain-700 fill-amber-20'/>
                    </div>

                    <div className=" h-12 w-12 flexCenter bg-primary-50 rounded-sm">
                        <FacebookIcon className='text-grayMain-700 fill-amber-20'/>
                    </div>

                    <div className=" h-12 w-12 flexCenter bg-primary-50 rounded-sm">
                        <WhatsappIcon className='text-grayMain-700 fill-amber-20'/>
                    </div>


                </div>
            </div>
            </div>
        </div>

    </footer>
  )
}

export default Footer