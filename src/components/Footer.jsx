import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full">
      {/* Floating CTA */}
      <div className="floater flex flex-col md:flex-row md:justify-between items-center gap-4 relative w-[90%] md:w-[70%] mx-auto p-6 md:p-8 bg-blue-300 rounded-lg -mb-10 z-10 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Ready for your next adventure?
        </h1>
        <Link to={"/explore"}>
          <button className="relative px-8 md:px-10 py-2 border-2 border-black text-black bg-transparent rounded-md overflow-hidden transition-all duration-500 z-10 group">
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
              Explore Now <MdArrowRightAlt />
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-black transition-all duration-500 group-hover:w-full z-0"></span>
          </button>
        </Link>
      </div>

      {/* Footer Content */}
      <div className="footer flex flex-col gap-10 w-full bg-[#143D60] p-8 md:p-12 lg:p-20 text-white pb-5">
        <div className="footer-content flex flex-col md:flex-row md:justify-between gap-10">
          {/* Col 1 */}
          <div className="col1 mt-5 sm:mt-10 flex flex-col gap-4 md:w-[30%]">
            <h1 className="text-xl md:text-2xl font-semibold flex gap-2 items-center">
              <ImLocation2 className="text-2xl md:text-3xl" />
              Trip Planner
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-justify">
              Travel should be exciting, not stressful. Our planner makes it easy
              to explore, plan, and prepare. Every trip starts smoother with us.
            </p>
            <div className="social-media flex gap-4 mt-2 text-xl md:text-2xl">
              <FaInstagram className="hover:border-b-2 border-white transition duration-300 cursor-pointer" />
              <FaFacebookF className="hover:border-b-2 border-white transition duration-300 cursor-pointer" />
              <FaTwitter className="hover:border-b-2 border-white transition duration-300 cursor-pointer" />
              <FaLinkedinIn className="hover:border-b-2 border-white transition duration-300 cursor-pointer" />
            </div>
          </div>

          {/* Col 2 with accordion */}
          <div className="col2 m t-5 sm:mt-10 flex flex-col md:flex-row gap-8 md:gap-14 w-full md:w-auto items-center md:items-start text-center md:text-left">
            {[
              {
                title: "Quick Links",
                content: [
                  { name: "Home", path: "/" },
                  { name: "Travel Guides", path: "/guides" },
                  { name: "Explore", path: "/explore" },
                  { name: "Trip Plans", path: "/trips" },
                  { name: "Contact", path: "/contact" },
                ],
                type: "links",
              },
              {
                title: "Support",
                content: ["FAQ", "Help Center", "Report a Problem"],
                type: "anchors",
              },
              {
                title: "Legal",
                content: ["Terms and Conditions", "Privacy Policy"],
                type: "anchors",
              },
            ].map((section, i) => (
              <div key={i} className="flex flex-col gap-2 w-full md:w-auto">
                {/* Accordion header */}
                <button
                  className="flex justify-between md:block text-lg font-semibold cursor-pointer w-full"
                  onClick={() => toggleSection(section.title)}
                >
                  {section.title}
                  <span className="md:hidden">
                    {openSection === section.title ? "−" : "+"}
                  </span>
                </button>

                {/* Accordion content */}
                <div
                  className={`flex flex-col gap-2 items-center md:items-start overflow-hidden transition-all duration-300 
                    ${openSection === section.title ? "max-h-40" : "max-h-0"} 
                    md:max-h-none md:overflow-visible`}
                >
                  {section.type === "links"
                    ? section.content.map((link, j) => (
                        <Link
                          key={j}
                          to={link.path}
                          onClick={() => {
                            if (link.name === "Home" || link.name === "Explore") {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="relative w-fit text-white cursor-pointer
                            after:content-[''] after:absolute after:left-0 after:bottom-0 
                            after:w-0 after:h-[2px] after:bg-white 
                            after:transition-all after:duration-300 
                            hover:after:w-full"
                        >
                          {link.name}
                        </Link>
                      ))
                    : section.content.map((item, j) => (
                        <a
                          key={j}
                          href="#"
                          className="relative w-fit text-white cursor-pointer 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 
                            after:w-0 after:h-[2px] after:bg-white 
                            after:transition-all after:duration-300 
                            hover:after:w-full"
                        >
                          {item}
                        </a>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs md:text-sm text-white border-t border-white/20 pt-4">
          © {new Date().getFullYear()} Trip Planner. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
