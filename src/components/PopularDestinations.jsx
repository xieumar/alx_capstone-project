import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Japan",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Greece",
    src: "https://images.unsplash.com/photo-1570015329194-675ae0cf2516?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Vietnam",
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Australia",
    src: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function PopularDestinations() {
  const [active, setActive] = useState(null);

  return (
    <div className="popular-destinations flex flex-col gap-6 w-full p-4 my-12">
      <div className="section-title w-full ">

        <div className="text  flex flex-col text-center mb-6">
          <p className=" text-[#143D60] font-bold">EXPLORE</p>
          <h1 className=" text-4xl font-semibold">Popular Destinations</h1>
        </div>

      </div>
      <div className="card-container flex justify-center items-center flex-wrap gap-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card relative shadow-lg rounded-xl overflow-hidden 
             transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
          >
            <img
              src={card.src}
              alt={card.title}
              className="w-[250px] h-[350px] object-cover rounded-xl"
            />
            <h3 className="text-lg font-semibold absolute bottom-2 left-3 px-2 text-stone-50 drop-shadow-md">
              {card.title}
            </h3>

         
            <div className="overlay absolute inset-0 bg-[#143D60]/60 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 flex items-center justify-center">
              <Link to={`/destination/${card.title.toLowerCase()}`} >
              <p className="relative px-6 py-2 text-white text-lg font-semibold cursor-pointer transition-colors duration-300 group">
                Explore {card.title}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all ease-in duration-300 group-hover:w-full"></span>
              </p>
              </Link>
            </div>


          </div>


        ))}
      </div>
      <div className="button mt-12 text-center mx-auto">
        <button className="relative px-10 py-2 border-2 border-[#143D60] text-[#143D60] bg-transparent rounded-md overflow-hidden transition-all duration-500 z-10 group">
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
            View More <MdArrowRightAlt />
          </span>
          <span className="absolute top-0 left-0 w-0 h-full bg-[#143D60] transition-all duration-500 group-hover:w-full z-0"></span>
        </button>
      </div>

    </div>
  );
}

export default PopularDestinations;
