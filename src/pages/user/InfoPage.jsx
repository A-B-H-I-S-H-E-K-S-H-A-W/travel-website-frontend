import { Heart, Star } from "lucide-react";
import React from "react";
import img from "../../assets/images/bg.jpg";
import { ButtonOutline, ButtonSolid } from "../../components/common/Button";
import ImagesCarousel from "../../components/user/ImagesCarousel";
import Reviews from "../../components/common/Reviews";

const InfoPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="bg-white shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={img}
            alt="Product image"
            className="w-full h-64 object-cover"
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
            <Heart size={15} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 py-10 px-20">
          <div>
            {/* Carousel */}
            <ImagesCarousel />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Bali
                </h2>
                <p className="text-sm text-gray-600">Electronics</p>
              </div>
            </div>
            <div className="py-2">
              <p className="text-lg font-bold text-green-600">₹12900.99</p>
              <p className="text-sm text-gray-500 line-through">₹15900.99</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <span className="text-gray-600 text-sm ml-2">(4.5/5)</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Experience crystal-clear sound with our premium wireless
              headphones. Perfect for music lovers and professionals alike.
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">In Stock</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <ButtonSolid
                title={"Book"}
                className={"flex-1 px-4 py-2 rounded-full"}
              />
              <ButtonOutline
                title={"Quick View"}
                className={"px-4 py-2 rounded-full"}
              />
            </div>
          </div>
        </div>
        <div className="px-20 pb-20">
          <div>
            <h2 className="text-3xl font-bold">Ratings and reviews</h2>
          </div>
          <div className="py-5">
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
