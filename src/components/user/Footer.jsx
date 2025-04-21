import {
  FacebookIcon,
  Instagram,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-0 bg-sky-950 pt-8">
      <div className="w-full md:px-20 mx-auto">
        <div className="grid md:grid-cols-2 gap-20 p-4">
          <div className="">
            <h1 className="text-cyan-600 text-5xl font-bold ">WanderSphere</h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4">
          <div className="mt-8">
            <h4 className="text-white font-bold text-xl md:text-2xl">
              Contact Us
            </h4>
            <ul className="text-white text-lg my-4 flex flex-col gap-5">
              <li>
                <i className="fa-solid fa-envelope"></i> Email:
                example.mail@gmail.com
              </li>
              <li>
                <i className="fa-solid fa-phone"></i> Mobile: +1 1234567890
              </li>
              <li>
                <p>Address:</p>
              </li>
            </ul>
            <h4 className="text-white font-bold text-xl md:text-2xl mt-6">
              Download App
            </h4>
          </div>

          <div className="mt-8">
            <h4 className="text-white font-bold text-xl md:text-2xl">About</h4>
            <ul className="text-white text-lg flex flex-col gap-3 my-3">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right"></i>
                <a href="#">About Us</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right"></i>
                <a href="#">Privacy Policy</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right"></i>
                <a href="#">Terms & Services</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right"></i>
                <a href="#">FAQ's</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right"></i>
                <a href="#">Blog's</a>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="text-white font-bold text-xl md:text-2xl">
              Help & Support
            </h4>
            <ul className="text-white text-lg flex flex-col gap-3 my-3">
              <li className="flex items-center gap-2">
                <a href="#">Help & Support</a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#">Trust & Security</a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#">Work zones Guide</a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#">WorkSpace</a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#">Reviews</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-sky-900 h-20 flex items-center justify-between px-4 md:px-20 gap-3">
        <div>
          <h5 className="text-white text-sm md:text-base font-bold">
            Copyright © 2024 WanderSphere All Rights Reserved.
          </h5>
        </div>
        <div className="flex gap-4 ">
          <a href="#">
            <TwitterIcon className="text-white" />
          </a>
          <a href="#">
            <FacebookIcon className="text-white" />
          </a>
          <a href="#">
            <Instagram className="text-white" />
          </a>
          <a href="#">
            <YoutubeIcon className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
