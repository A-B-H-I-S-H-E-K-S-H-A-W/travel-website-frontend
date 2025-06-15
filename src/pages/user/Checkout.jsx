import React from "react";
import Layout from "../../Layout";
import Input from "../../components/common/Input";
import { ButtonSolid } from "../../components/common/Button";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const bookingData = state?.bookingData;

  return (
    <Layout>
      <div className="px-5 md:px-20 py-20 min-h-screen">
        <div className="p-2 text-3xl font-bold">
          Checkout Page
        </div>
        <div className="grid md:grid-cols-[65%_33%] gap-[2%]">
          {/* Booking Summary Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              {bookingData && (
                <div className="border p-4 rounded-lg shadow">
                  <img
                    src={
                      bookingData.images?.[0] ||
                      "https://via.placeholder.com/300"
                    }
                    alt="preview"
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-xl font-bold">
                    {bookingData.name ||
                      bookingData.busName ||
                      bookingData.airline ||
                      "Booking Item"}
                  </h3>
                  <p className="text-gray-600">
                    {bookingData.city || bookingData.departureCity || ""} →{" "}
                    {bookingData.destination || bookingData.arrivalCity || ""}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Travel Date: {bookingData.travelDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price: ₹
                    {bookingData.finalAmount || bookingData.fare || "--"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-6 bg-white rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-2">Payment Method</h3>
            <p className="text-gray-600 mb-6">
              Add a new payment method to complete your booking.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium">Full Name</p>
                <Input type="text" placeholder="Full Name" />
              </div>
              <div>
                <p className="font-medium">City</p>
                <Input type="text" placeholder="City" />
              </div>
              <div>
                <p className="font-medium">Card Number</p>
                <Input type="number" placeholder="Card Number" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-medium">Expires</label>
                  <select className="w-full border py-1.5 rounded-md">
                    {[
                      "Month",
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, i) => (
                      <option key={i}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium">Year</label>
                  <select className="w-full border py-1.5 rounded-md">
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={1995 + i}>
                        {1995 + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium">CVC</label>
                  <Input type="number" placeholder="CVC" />
                </div>
              </div>

              <div className="mt-8">
                <ButtonSolid
                  title="Continue"
                  className="w-full py-2 rounded-md"
                >
                  Continue
                </ButtonSolid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
