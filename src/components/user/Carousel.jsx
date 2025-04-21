import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const CardCarousel = ({ offerCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Get visible cards count based on screen size
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 ? 3.3 : 1.8;
    }
    return 4; // Default to desktop view
  };

  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(0, offerCards.length - Math.floor(visibleCards));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalSlides) {
      nextSlide();
    } else if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate translateX for the carousel
  const translateX = `-${currentIndex * (100 / visibleCards)}%`;

  return (
    <div className="relative w-full mx-auto md:px-20 px-2 py-1">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 gap-2 ease-out"
          style={{ transform: `translateX(${translateX})` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {offerCards.map((card) => (
            <div
              key={card.id}
              className="shrink-0 relative z-0 px- w-full "
              style={{ width: `${100 / visibleCards}%` }}
            >
              <div className="md:h-[22rem] sm:h-[18rem] h-[16rem] bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg">
                <img
                  className="w-full h-full rounded-lg"
                  src={card.src}
                  alt="img"
                />
                <div className="inset-0 absolute z-10 flex rounded-lg justify-center items-center hover:bg-black/40 text-white duration-300">
                  <p className="text-3xl font-semibold">{card.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots (Optional) */}
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

      {/* Navigation Buttons */}
      <div className="flex md:justify-end justify-center mt-5">
        <div>
          <button
            className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            {/* <ChevronLeft className="h-6 w-6" /> */}
            <ArrowLeft />
          </button>

          <button
            className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={nextSlide}
            disabled={currentIndex >= totalSlides}
          >
            {/* <ChevronRight className="h-6 w-6" /> */}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
