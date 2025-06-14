import React from "react";
import { ButtonSolid } from "../common/Button";

const SearchBox = () => {
  return (
    <div>
      <div className="w-full md:h-16 md:rounded-full rounded-xl md:max-w-5xl mx-auto bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center px-2 gap-2">
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <pre>Choose Location</pre>
            <input type="text" className="border-4 rounded-xl w-full" />
          </div>
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <pre>Destination</pre>
            <input type="text" className="border-4 rounded-xl w-full" />
          </div>
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <pre>Date of Stay</pre>
            <input type="date" className="border-4 rounded-xl w-full" />
          </div>
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <pre>Add Guest</pre>
            <select name="" id="" className="border-4 rounded-xl w-full">
              <option value="1">1 People</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="8">8 People</option>
              <option value="10">10 People</option>
            </select>
          </div>
          <div className="h-16 col-span-2 md:col-auto flex justify-center items-center">
            <ButtonSolid
              title={"Search"}
              className={
                "md:px-16 sm:px-14 px-20 py-2 md:py-3 md:rounded-full rounded-xl"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
