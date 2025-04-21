import React from "react";

export default function Skeleton() {
  return (
    <div className="block rounded-lg p-4 shadow-xl h-auto">
      <div className="h-48 w-full rounded-md bg-gray-200"></div>

      <div className="mt-2">
        <dl>
          <div>
            <div className="bg-gray-200 p-2 mb-1"></div>
          </div>

          <div>
            <div className="bg-gray-200 p-2"></div>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-6 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <div className="py-4 px-8 bg-gray-200"></div>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <div className="py-4 px-8 bg-gray-200"></div>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <div className="py-4 px-8 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
