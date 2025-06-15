import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";
import { useUserAuth } from "../../context/UserAuthContext";
import InfoCard from "../../components/user/InfoCard";
import { useParams } from "react-router-dom";

const RecentTrips = () => {
  const { fetchBookings } = useUserAuth();
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("userToken");

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBookings(`/api/booking/my-booking/${id}`, token);
      console.log("Fetched bookings:", data);
      if (data) setBookings(data);
    };
    getData();
  }, []);

  return (
    <Layout>
      <div
        className="inset-0 mt-20 md:h-54 h-64 text-white w-screen"
        style={{
          background: `url(${loginBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pt-20 px-5 md:px-20">
          <h3 className="text-3xl font-bold">Your Recent Trips</h3>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 pb-20">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <InfoCard key={booking._id} data={booking} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 text-lg">
            No recent trips found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default RecentTrips;
