
import React, { useContext } from "react";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from './Logo.jsx'
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { ThemeContext } from "../App.jsx";

const Footer = () => {
   const theme=useContext(ThemeContext)
  return (
  <footer
    data-aos="fade-up"
    className={`bg-gradient-to-b sm:bg-gradient-to-r from-[#1f1f3b] via-purple-900/50  to-pink-700/50 text-slate-300 shadow-sky-400 
  border-t mx-auto border-blue-100 py-8 mt-12 px-5 md:px-10 text-center shadow-inner
  text-sm w-screen 
  relative`}>

    <div className="flex justify-center items-center gap-2 mb-6">
      <span className="text-slate-300">---------</span>
      <Logo/>
     <span className="text-slate-300">---------</span>
    </div>
    {/* col2 */}
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
      {/* company'es contact info*/}
      <div className="flex flex-col gap-2 text-center">
        <div className="flex text-center justify-center">
          <span className="text-slate-300">-----</span>
          <span className="text-[#5daad6] text-lg font-bold ">Contact Us</span>
          <span className="text-slate-300">-----</span>
        </div>
        
        {/* adress */}
        <div className="flex gap-2  justify-center text-left">
          <FaLocationDot size={'20px'} className="text-[#dd3b51]"/>
          <span className="text-wrap max-w-36 text-left md:text-left">
            D-45, 3rd Floor,
            Sector 8, Dwarka,
            New Delhi, 110077
            India.
        </span>
        </div>
        {/* contact no */}
        <div className="flex gap-2 items-center justify-center sm:justify-start">
          <IoCall size={'20px'} className="text-[#63df6d] text-start"/>
          <span className="text-wrap max-w-36 text-left">
            +91 9116532218
        </span>
        </div>
        {/* email address */}
        <div className="flex gap-2 items-center justify-center text-left">
          <MdEmail size={'20px'} className="text-[#5daad6]"/>
          <span className="text-wrap max-w-36 text-left">
            vivekprakash.st@gmail.com
        </span>
        </div>
      </div>
      {/* quick links */}
       <div className="flex flex-col gap-2 text-center mt-10 sm:mt-0">
        <div className="flex justify-center items-center">
          <span className="text-slate-300">-----</span>
          <span className="text-[#5daad6] text-lg font-bold ">Quick Links</span>
          <span className="text-slate-300">-----</span>
        </div>
          
          <ul className="text-center">
            <li>
              <a href="/"  className={` text-slate-300 hover:text-white text-sm
               hover:scale-110 duration-150`}>Home</a>
            </li>
            <li>
              <a href="/journal"  className={` text-slate-300 hover:text-white text-sm
               hover:scale-110 duration-150`}>Journal</a>
            </li>
             <li>
              <a href="/news"  className={` text-slate-300 hover:text-white text-sm
               hover:scale-110 duration-150`}>News</a>
            </li>
              <li>
              <a href="/about" className={` text-slate-300 hover:text-white text-sm
               hover:scale-110 duration-150`}>About</a>
            </li>
            <li>
              <a href="/dashboard" className={` text-slate-300 hover:text-white text-sm
               hover:scale-110 duration-150`}>Dashboard</a>
            </li>
          </ul>
       </div>

       {/* social media handles */}
       <div className="flex flex-col gap-6  mt-10 sm:mt-0">
        {/* heading */}
           <div className="flex justify-center items-center">
          <span className="text-slate-300">-----</span>
          <span className="text-[#5daad6] text-lg font-bold ">Connect with us</span>
          <span className="text-slate-300">-----</span>
        </div>

        <div className="flex gap-4 sm:gap-2 md:gap-3 items-center justify-center">
          {/* github */}
          <a className="border-2  border-transparent hover:border-[#5daad6] p-1  rounded-full"
             href='https://github.com/IkkiOcean' 
             target="_blank" 
             rel="noopener noreferrer">
            <BsGithub className="text-slate-300" size={'25px'}/>
          </a>
          {/* linkedIn */}
           <a className="border-2 border-transparent p-1 hover:border-[#5daad6] rounded-full"
             href='https://www.linkedin.com/in/itsvivekprakash/' 
             target="_blank" 
             rel="noopener noreferrer">
            <FaLinkedinIn className="text-slate-300" size={'25px'}/>
          </a>
          {/* twitter */}
          <a className="border-2 border-transparent p-1 hover:border-[#5daad6] rounded-full"
             href='https://www.linkedin.com/in/itsvivekprakash/' 
             target="_blank" 
             rel="noopener noreferrer">
            <AiFillTwitterCircle className="text-slate-300" size={'25px'}/>
          </a>
          {/* twitter */}
          <a className="border-2 border-transparent p-1 hover:border-[#5daad6] rounded-full"
             href='https://www.linkedin.com/in/itsvivekprakash/' 
             target="_blank" 
             rel="noopener noreferrer">
            <FaFacebook className=" text-slate-300 rounded-full" size={'25px'}/>
          </a>
          </div>
          
       
       </div>
    </div>
    {/* line  */}
    <div className="my-10 border-t-[0.1px] border-[#5daad6]"/>
    {/* rights reserved */}
    <div>
      <span className="text-sm text-[#5daad6]">&#169; 2025. All rights reserved</span>
    </div>

  </footer>
)};

export default Footer;

