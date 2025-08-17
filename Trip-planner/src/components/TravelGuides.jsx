import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const cards = [
  {
    title: "Hidden gems in Vietnam",
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Lev Von Knacht",
    authorImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    description: "Discover the hidden gems of Vietnam",
  },
  {
    title: "Exploring the beaches of Greece",
    src: "https://images.unsplash.com/photo-1570015329194-675ae0cf2516?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "John Doe",
    authorImg:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    description: "Explore the beautiful beaches of Greece",
  },
  {
    title: "Cultural wonders of Japan",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Jane Smith",
    authorImg:
      "https://images.unsplash.com/photo-1730573520149-7a5b97d35ccc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    description: "Experience the cultural wonders of Japan",
  },
];

function TravelGuides() {
  const [active, setActive] = useState(null);
  return (
    <div className="travel-guides flex flex-col gap-6 w-full p-10 my-6">
      <div className="section-title w-full flex justify-between items-center px-[100px]">
        <div className="text  flex flex-col gap-2 ">
          <h1 className=" text-3xl font-semibold">Popular Travel guides</h1>
          <p>
            Discover handpicked travel guides that make exploring the world
            easier, smarter, and more exciting
          </p>
        </div>

        <div className="icons flex gap-2 text-4xl text-blue-800 cursor-pointer">
          {active === "left" ? (
            <IoIosArrowDropleftCircle onClick={() => setActive(null)} />
          ) : (
            <IoIosArrowDropleft onClick={() => setActive("left")} />
          )}

          {active === "right" ? (
            <IoIosArrowDroprightCircle onClick={() => setActive(null)} />
          ) : (
            <IoIosArrowDropright onClick={() => setActive("right")} />
          )}
        </div>
      </div>
      <div className="cards-container flex justify-center items-center flex-wrap gap-6">
        {cards.map((card, index) => (
          <div key={index} className="card flex flex-col gap-4">
            <img
              src={card.src}
              alt={card.title}
              className="w-[340px] h-[280px] rounded-2xl object-cover"
            />
            <div className="text flex gap-2 flex-col">
              <h1 className=" text-base font-semibold">{card.description}</h1>
              <div className=" flex gap-4 items-center">
                <img
                  src={card.authorImg}
                  alt={card.title}
                  className=" w-[45px] h-[45px] rounded-full bg-center"
                />
                <p>{card.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelGuides;
