import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur mollitia quo inventore atque magnam, delectus voluptate? Dolores velit illum impedit dolore maxime ratione laudantium.",
    reviewerImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    rating:
      "https://static.vecteezy.com/system/resources/previews/009/663/927/non_2x/5-star-rating-review-star-transparent-free-png.png",
    bg: "bg-blue-100",
    hoverBg: "hover:bg-blue-200",
    reviewer: "John D.",
  },
  {
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur mollitia quo inventore atque magnam, delectus voluptate? Dolores velit illum impedit dolore maxime ratione laudantium.",
    reviewerImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    rating:
      "https://static.vecteezy.com/system/resources/previews/009/663/928/non_2x/5-star-rating-review-star-transparent-free-png.png",
    bg: "bg-green-100",
    hoverBg: "hover:bg-green-200",
    reviewer: "John D.",
  },
  {
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur mollitia quo inventore atque magnam, delectus voluptate? Dolores velit illum impedit dolore maxime ratione laudantium.",
    reviewerImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8MnwwfHx8Mg%3D%3D",
    rating:
      "https://static.vecteezy.com/system/resources/previews/009/663/927/non_2x/5-star-rating-review-star-transparent-free-png.png",
    bg: "bg-pink-100",
    hoverBg: "hover:bg-pink-200",
    reviewer: "John D.",
  },
];

function Testimonials() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="testimonials flex flex-col gap-3 w-full p-10 my-6">
      <div className="text flex flex-col text-center">
        <p className=" font-bold text-[#143D60]">TESTIMONIALS</p>
        <h1 className="text-3xl sm:text-5xl font-semibold">
          Trusted by Clients, <br /> Reccomended by Clients
        </h1>
      </div>
      <div className="card-container flex justify-center flex-wrap gap-8 mt-6" ref={containerRef}>
        {cards.map((card, index) => (
          <motion.div
            className={`card w-[350px] p-8 rounded-lg shadow-lg pb-0 cursor-pointer ${card.bg} ${card.hoverBg} `}
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.3 }}
          >
            <p className=" text-justify">"{card.text}"</p>
            <div className="flex justify-between ">
              <div className="reviewer flex gap-4">
                <img
                  src={card.reviewerImg}
                  className=" w-[35px] h-[35px] rounded-full mt-[30px]"
                />
                <p className=" mt-[40px] font-semibold">{card.reviewer}</p>
              </div>
              <img src={card.rating} className=" w-[150px]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
