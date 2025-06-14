import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CardCarousel = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 ? 3.3 : 1.8;
    }
    return 4;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Use incoming data length
  const totalSlides = Math.max(0, data.length - Math.floor(visibleCards));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > 50 && currentIndex < totalSlides) nextSlide();
    else if (distance < -50 && currentIndex > 0) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  const translateX = `-${currentIndex * (100 / visibleCards)}%`;

  return (
    <div className="relative w-full mx-auto md:px-20 px-2 py-1">
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 gap-2 ease-out"
          style={{ transform: `translateX(${translateX})` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {data.map((item, index) => (
            <Link
              to={`/info/${item._id}`}
              key={item._id || index}
              className="shrink-0 relative z-0 w-full cursor-pointer"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <div className="md:h-[22rem] sm:h-[18rem] h-[16rem] bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg overflow-hidden">
                <img
                  className="w-full h-full rounded-lg object-cover"
                  src={
                    item?.images?.[0] || "https://via.placeholder.com/300x200"
                  }
                  alt="cover"
                />
                <div className="inset-0 absolute z-10 flex rounded-lg p-4 justify-start items-end bg-gradient-to-b from-transparent to-black/80 hover:bg-black/10 text-white duration-300">
                  <p className="text-xl font-semibold text-center px-2">
                    {item?.name || item?.busName || item?.airline || "No title"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: totalSlides + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex md:justify-end justify-center mt-5">
        <div className="flex gap-2">
          <button
            className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ArrowLeft />
          </button>
          <button
            className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={nextSlide}
            disabled={currentIndex >= totalSlides}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
