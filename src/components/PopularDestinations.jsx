import React, { useRef } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const cards = [
  { title: "London", src: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Athens", src: "https://images.unsplash.com/photo-1570015329194-675ae0cf2516?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "New York", src: "https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Sydney", src: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

function PopularDestinations() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="popular-destinations flex flex-col gap-6 w-full p-4 my-12" >
      <div className="section-title w-full text-center mb-0 sm:mb-6">
        <p className="text-[#143D60] font-bold">EXPLORE</p>
        <h1 className="text-3xl sm:text-5xl font-semibold">Popular Destinations</h1>
      </div>

      <div className="card-container flex justify-center items-center flex-wrap gap-6" ref={containerRef}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.3 }}
            className="card relative shadow-lg rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={card.src}
              alt={card.title}
              className="w-[250px] h-[350px] object-cover rounded-xl"
            />
            <h3 className="text-lg font-semibold absolute bottom-2 left-3 px-2 text-stone-50 drop-shadow-md">
              {card.title}
            </h3>

            <div className="overlay absolute inset-0 bg-[#143D60]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Link to={`/destination/${card.title.toLowerCase()}`}>
                <p className="relative px-6 py-2 text-white text-lg font-semibold cursor-pointer transition-colors duration-300 group">
                  Explore {card.title}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all ease-in duration-300 group-hover:w-full"></span>
                </p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="button mt-12 text-center">
        <Link to="/explore">
          <button className="relative px-10 py-2 border-2 border-[#143D60] text-[#143D60] bg-transparent rounded-md overflow-hidden transition-all duration-500 z-10 group">
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
              View More <MdArrowRightAlt />
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-[#143D60] transition-all duration-500 group-hover:w-full z-0"></span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PopularDestinations;
