import React from "react";

import { ButtonOutline } from "../common/Button";
import CardCarousel from "./Carousel";

const Cards = ({ CardTitle, data }) => {
  return (
    <div className="">
      <div>
        <div className="h-40 flex items-center justify-between md:px-20 px-4">
          <h2 className="md:text-4xl text-2xl font-bold">{CardTitle}</h2>
        </div>
        <div>
          <CardCarousel data={data} />
        </div>
      </div>
    </div>
  );
};

export default Cards;
