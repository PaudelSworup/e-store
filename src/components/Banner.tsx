"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    "https://img.lazcdn.com/us/domino/789ee842-417b-445f-9c35-d67adc8d3dcc_NP-1976-688.jpg_2200x2200q80.jpg_.webp",
    "https://img.lazcdn.com/us/domino/47a94dd7-46cd-4f2b-b2b2-27d4e59446cf_NP-1976-688.jpg_2200x2200q80.jpg_.webp",
    "https://img.lazcdn.com/us/domino/09a03719-f90e-4a12-a9f4-ba51fd98a613_NP-1976-688.jpg_2200x2200q80.jpg_.webp",
  ];

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       handleNextSlide();
  //     }, 3000); // Change slide every 3 seconds

  //     return () => clearInterval(interval);
  //   }, [activeIndex]);

  const handleNextSlide = () => {
    if (activeIndex === slides.length - 1) {
      setIsTransitioning(true);
      setActiveIndex(0);
    } else {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <Carousel className="overflow-hidden ">
      <CarouselContent
        className={`transition-transform ease-in-out duration-1000 ${
          isTransitioning ? "no-transition" : ""
        }`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((src, index) => (
          <CarouselItem key={index}>
            <Image
              src={src}
              alt=""
              width={900}
              height={900}
              className="w-full xl:h-[500px] overflow-hidden"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={handlePrevSlide} />
      <CarouselNext onClick={handleNextSlide} />
    </Carousel>
  );
}
