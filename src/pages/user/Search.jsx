import React from "react";
import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";
import { ButtonOutline, ButtonSolid } from "../../components/common/Button";
import InfoCard from "../../components/common/InfoCard";
import SearchBox from "../../components/user/SearchBox";

const Search = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Layout>
        <main>
          <div className="pt-20">
            <div
              className="inset-0 md:h-54 h-64 flex flex-col items-center w-screen"
              style={{
                background: `url(${loginBg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="pt-20 px-3">
                <SearchBox />
              </div>
            </div>
            <div className="min-h-screen mt-28">
              <div className="md:px-20 px-5 flex items-center justify-between">
                <h2 className="md:text-3xl text-xl font-bold">Top Searches</h2>
                <ButtonOutline
                  title={"View all"}
                  className={"md:px-3 px-2 py-1 md:py-2 rounded-md"}
                />
              </div>

              <div className="mt-10 grid grid-cols-3 px-20 pb-20">
                {arr.map(() => (
                  <InfoCard />
                ))}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Search;
