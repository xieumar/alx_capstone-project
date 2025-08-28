import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <div className=" w-full ">
      <div className="floater flex justify-between relative w-[70%] mx-auto p-8 xl:px-20 bg-blue-300 rounded-lg -mb-10 z-10">
        <h1 className="text-3xl font-semibold">
          Ready for your next adventure?{" "}
        </h1>
        <div className="button text-center">
          <button className="relative px-10 py-2 border-2 border-black text-black bg-transparent rounded-md overflow-hidden transition-all duration-500 z-10 group">
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
              Book Now <MdArrowRightAlt />
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-black transition-all duration-500 group-hover:w-full z-0"></span>
          </button>
        </div>
      </div>
      <div className="footer flex flex-row justify-between w-full bg-[#143D60] p-20 px[100px] text-white pb-10">
        <div className="col1 flex flex-col gap-2 xl:w-[30%]">
          <h1 className=" text-2xl font-semibold flex gap-1 align-center justify-baseline">
            <ImLocation2 className=" text-3xl" />
            Trip Planner
          </h1>
          <p className=" text-justify ">
            Travel should be exciting, not stressful. Our planner makes it easy
            to explore, plan, and prepare. Every trip starts smoother with us.
          </p>
          <div className="social-media flex gap-4 mt-2 text-3xl">
            <FaInstagram className="pb-2  hover:border-b-2 border-white transition duration-300 cursor-pointer" />
            <FaFacebookF className="pb-2  hover:border-b-2 border-white transition duration-300 cursor-pointer" />
            <FaTwitter className="pb-2  hover:border-b-2 border-white transition duration-300 cursor-pointer" />
            <FaLinkedinIn className="pb-2  hover:border-b-2 border-white transition duration-300 cursor-pointer" />
          </div>
        </div>
       <div className="col2 flex justify-between">
       <div className="col21 flex gap-2 flex-col px-8">
          <h1 className="text-lg font-semibold">Quick Links</h1>

          {["Home", "Travel Guides", "Explore", "Trip Plans", "Contact"].map(
            (link, i) => (
              <a
                key={i}
                href="#"
                className="relative w-fit text-white cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            )
          )}
        </div>

        <div className="col22 flex gap-2 flex-col px-8">
          <h1 className="text-lg font-semibold">Support</h1>

          {["FAQ", "Help Center", "Report a Problem"].map(
            (link, i) => (
              <a
                key={i}
                href="#"
                className="relative w-fit text-white cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            )
          )}
        </div>

        <div className="col23 flex gap-2 flex-col px-8">
          <h1 className="text-lg font-semibold">Legal</h1>

          {["Terms and Conditions", "Privacy Policy"].map(
            (link, i) => (
              <a
                key={i}
                href="#"
                className="relative w-fit text-white cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            )
          )}
        </div>
       </div>
      </div>
    </div>
  );
}

export default Footer;
