import React from "react";
import Layout from "../../Layout";
import CardItems from "../../components/user/CardItems";
import loginBg from "../../assets/images/search.jpg";

const Saved = () => {
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
              <h3 className="text-3xl font-bold">Your Saved Travels</h3>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <CardItems />
        </div>
      </Layout>
    </>
  );
};

export default Saved;
