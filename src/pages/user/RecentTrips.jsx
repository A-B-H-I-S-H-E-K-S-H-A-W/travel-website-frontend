import React from "react";
import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";
import InfoCard from "../../components/common/InfoCard";

const RecentTrips = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
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
          <div className="pt-20 px-20">
            <div>
              <h3 className="text-3xl font-bold">Your Recent Trips</h3>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-3 px-20 pb-20">
          {arr.map(() => (
            <InfoCard />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default RecentTrips;
