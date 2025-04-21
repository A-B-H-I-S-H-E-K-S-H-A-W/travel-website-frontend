import React, { useEffect, useState } from "react";
import { ButtonSolid } from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import Cards from "../../components/user/Cards";
import { offers } from "../../data";
import Layout from "../../Layout";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show the loader for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <div className="min-h-screen py-10 bg-cover bg-no-repeat bg-[url('./src/assets/images/bg_main.jpg')]">
              <main className="md:pt-28 max-w-6xl mx-auto pt-14 md:px-20 px-3">
                <div className="text-center md:space-x-5">
                  <div className="mt-16">
                    <div>
                      <h2 className="md:text-6xl text-4xl font-bold">
                        Journey Beyond Boundaries, Where Dreams Meet{" "}
                        <span className="style-regular text-blue-700">
                          Destination.
                        </span>
                      </h2>
                      <div className="mt-2">
                        <p className="md:text-base text-xs max-w-2xl mx-auto uppercase">
                          Discover, explore, and live your travel dreams with
                          us—because the world is too beautiful to stay in one
                          place. Let’s create memories that last a lifetime!
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="w-full md:h-16 md:rounded-full rounded-xl md:max-w-5xl mx-auto bg-white">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center px-2 gap-2">
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
                                  "md:px-16 sm:px-14 px-20 py-2 md:py-3 md:rounded-full rounded-xl"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Cards
              CardTitle={"Top offers live now"}
              CardBtn={"See more"}
              offers={offers}
            />
            <Cards
              CardTitle={"Top hotels to choose from"}
              CardBtn={"More hotels"}
              offers={offers}
            />
            <Cards
              CardTitle={"Choose perfect destination."}
              CardBtn={"Search Places"}
              offers={offers}
            />
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
