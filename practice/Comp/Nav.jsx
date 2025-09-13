"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


const Nav = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide
        setVisible(false);
      } else {
        // scrolling up → show
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full   z-50 transition-transform duration-300 ${
        visible ? "translate-y-0 " : "-translate-y-full "
      } pt-4 bg-foreGround-700/5 backdrop-blur-sm`}
    >
      <nav>
        <div className=" flex items-center justify-between h-16  px-4 ">
          {/* Logo */}
          <div className="flex gap-1 items-center">
            <Link href="/">
              <div className="relative  w-15 h-15">
                <Image
                src="/logoMain.svg"
                alt="logo"
                fill
                priority
              />
              </div>
            </Link>
            <h4 className="logoText font-workSans w-20 text-primary-700 text-text-100/80 font-[600]">
              YourTech Solutions
            </h4>
          </div>

          {/* box center */}
          <div className="hidden md:block gap-10 ">
            <div className="flex gap-20 body-sm">
                <p>Blog</p>
            <p>Team</p>
            <p>portfolio</p>
            </div>
          </div>

          {/* Right side */}
          <div>
            <Button
                        
                   className="border-2 border-primary-300  text-primary-foreground px-5 py-7 rounded-2xl  text-md text-text-100/80 font-bold w-fit mx-auto tracking-widest"
                    >
                                See our work
                    </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;