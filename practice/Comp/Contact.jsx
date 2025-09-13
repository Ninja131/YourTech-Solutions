import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  return (
     <section id="contact" className="py-20 bg-muted/50 px-4">
      <div className="container mx-auto   max-w-[625px]">
        <div className="text-center mb-16 ">
          <h2 className="text-5xl font-bold text-text-100/80 mb-4 animate-fade-in-up text-balance">Get In Touch</h2>
          <p className="text-lg text-text-100/50  mx-auto animate-fade-in-up [animation-delay:0.1s] text-pretty  text-[24px]">
            Ready to transform your business with innovative technology solutions? Let's start the conversation.
          </p>
        </div>

        <div className="mx-auto ">
          <form className="flex flex-col gap-6 animate-fade-in-up [animation-delay:0.2s] opacity-100 ">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                className="border rounded-lg px-4 py-7 focus:ring-primary focus:border-transparent transition-all duration-200
                bg-foreGround-700/50
                focus:ring-primary-300
                border-primary-300/10
                placeholder-text-100/20
                "
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                className="border rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200
                bg-foreGround-700/50
                focus:ring-primary-300
                border-primary-300/10
                placeholder-text-100/20
                py-7"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                rows={5}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none
                bg-foreGround-700/50
                focus:ring-primary-300
                border-primary-300/10
                placeholder-text-100/20 h-40"
              />
            </div>
            <Button
                        
                   className="bg-primary-300 hover:bg-primary-500 text-primary-foreground px-10 py-10 rounded-3xl  text-xl text-darkGreen-800/80 font-bold  mx-auto tracking-widest w-full"
                    >
                                Let's Connect
                    </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact




