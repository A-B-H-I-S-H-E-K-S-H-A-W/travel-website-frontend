import React from "react";
import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";
import { ButtonOutline, ButtonSolid } from "../../components/common/Button";
import CardItems from "../../components/user/CardItems";

const Search = () => {
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
                <div className="w-full md:h-16 md:rounded-full rounded-xl md:max-w-5xl mx-auto bg-white">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center">
                    <div className="h-16 w-full flex flex-col items-start justify-center px-5">
                      <pre>Choose Location</pre>
                      <input
                        type="text"
                        className="border-4 rounded-xl w-full"
                      />
                    </div>
                    <div className="h-16 w-full flex flex-col items-start justify-center px-5">
                      <pre>Choose Destination</pre>
                      <input
                        type="text"
                        className="border-4 rounded-xl w-full"
                      />
                    </div>
                    <div className="h-16 w-full flex flex-col items-start justify-center px-5">
                      <pre>Date of Stay</pre>
                      <input
                        type="date"
                        className="border-4 rounded-xl w-full"
                      />
                    </div>
                    <div className="h-16 w-full flex flex-col items-start justify-center px-5">
                      <pre>Add Guest</pre>
                      <select
                        name=""
                        id=""
                        className="border-4 rounded-xl w-full"
                      >
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
                        title={"Serach"}
                        className={
                          "md:px-18 sm:px-14 px-20 py-2 md:py-3 md:rounded-full rounded-xl"
                        }
                      />
                    </div>
                  </div>
                </div>
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

              <div className="mt-4">
                <CardItems />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Search;
