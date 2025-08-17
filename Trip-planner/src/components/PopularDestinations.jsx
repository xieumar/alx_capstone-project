import React, { useState } from "react";
import { IoIosArrowDropleft,  IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

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
    <div className="popular-destinations flex flex-col gap-6 w-full p-4 my-6">
      <div className="section-title w-full flex justify-between items-center px-[100px]">
        <div className="text  flex flex-col gap-2 ">
          <h1 className=" text-3xl font-semibold">Popular Destinations</h1>
          <p>
            Discover travel spots filled with culture, beauty, and adventure.
          </p>
        </div>

        <div className="icons flex gap-2 text-4xl text-blue-800 cursor-pointer">
          {active === "left" ? (
            <IoIosArrowDropleftCircle
              onClick={() => setActive(null)}
            />
          ) : (
            <IoIosArrowDropleft
              onClick={() => setActive("left")}
            />
          )}

          {active === "right" ? (
            <IoIosArrowDroprightCircle
              onClick={() => setActive(null)}
            />
          ) : (
            <IoIosArrowDropright
              onClick={() => setActive("right")}
            />
          )}
        </div>
      </div>
      <div className="card-container flex justify-center items-center flex-wrap gap-6 ">
        {cards.map((card, index) => (
          <div key={index} className="card relative">
            <img
              src={card.src}
              alt={card.title}
              className="w-[250px] h-[350px] rounded-2xl object-cover"
            />
            <h3 className=" text-lg font-semibold mt-2 absolute bottom-2 left-3 px-2 text-stone-50">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularDestinations;
