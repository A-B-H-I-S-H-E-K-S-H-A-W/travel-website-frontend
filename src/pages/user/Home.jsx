import React, { useEffect, useState } from "react";
import { ButtonSolid } from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import Cards from "../../components/user/Cards";

import Layout from "../../Layout";
import bg from "../../assets/images/bg_main.jpg";
import SearchBox from "../../components/user/SearchBox";
import { useUserAuth } from "../../context/UserAuthContext";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [buses, setBuses] = useState([]);

  const { fetchDashboardCard } = useUserAuth();

  useEffect(() => {
    // Show the loader for 3 seconds
    if (localStorage.getItem("userToken")) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getData = async () => {
    try {
      const res = await fetchDashboardCard("/api/fetch/items");
      if (res) {
        setData(res);
        setHotels(res.hotels);
        setFlights(res.flights);
        setBuses(res.buses);
      }
    } catch (error) {
      console.log("Got an error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <div
              style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="min-h-screen py-10"
            >
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
                        <SearchBox />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Cards
              data={buses}
              CardTitle={"Top offers live now"}
              CardBtn={"See more"}
            />
            <Cards
              data={hotels}
              CardTitle={"Top hotels to choose from"}
              CardBtn={"More hotels"}
            />
            <Cards
              data={flights}
              CardTitle={"Choose perfect destination."}
              CardBtn={"Search Places"}
            />
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
