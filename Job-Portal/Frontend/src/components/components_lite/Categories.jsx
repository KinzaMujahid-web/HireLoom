import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // search handler
  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold ">
          Explore Popular Categories
        </h1>

        <p className="text-gray-700 mt-4 text-sm md:text-base">
          Find opportunities from trending tech and creative fields.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {Category.map((category, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="bg-[#34C6B3] rounded-2xl p-6 h-35 flex flex-col justify-between shadow-xl hover:scale-105 transition-all duration-300">
                    <div>
                      <h2 className="text-lg font-bold text-black leading-6">
                        {category}
                      </h2>
                    </div>

                    <Button
                      onClick={() => searchjobHandler(category)}
                      className="bg-black hover:bg-white hover:text-black text-white rounded-xl"
                    >
                      Explore Jobs
                    </Button>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Buttons */}
          <CarouselPrevious className="bg-[#34C6B3] border-none text-black hover:bg-white -left-3.75" />

          <CarouselNext className="bg-[#34C6B3] border-none text-black hover:bg-white -right-3.75" />
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;