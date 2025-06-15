import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";
import { ButtonOutline } from "../../components/common/Button";
import InfoCard from "../../components/common/InfoCard";
import SearchBox from "../../components/user/SearchBox";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import FlightInfoCard from "../../components/admin/FlightInfoCard";
import BusInfoCard from "../../components/admin/BusInfoCard";

const TABS = ["Flights", "Buses", "Hotels"];

const Search = () => {
  const location = useLocation();
  const { fetchSearchData } = useUserAuth();

  const initialFormData = location.state?.formData || null;
  const initialResults = location.state?.searchResults || null;

  const [flight, setFlight] = useState(initialResults?.flights || []);
  const [buse, setBus] = useState(initialResults?.buses || []);
  const [hotel, setHotel] = useState(initialResults?.hotels || []);

  const [activeTab, setActiveTab] = useState("Flights");

  const handleSearch = async (formData) => {
    try {
      const res = await fetchSearchData("/api/fetch/search", formData);
      if (res) {
        setFlight(res.flights);
        setHotel(res.hotels);
        setBus(res.buses);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const renderCards = () => {
    let data = [];
    let CardComponent = null;

    switch (activeTab) {
      case "Flights":
        data = flight;
        CardComponent = FlightInfoCard;
        break;
      case "Buses":
        data = buse;
        CardComponent = BusInfoCard;
        break;
      case "Hotels":
        data = hotel;
        CardComponent = InfoCard;
        break;
      default:
        return null;
    }

    if (!data.length) {
      return (
        <p className="text-center col-span-full">
          No {activeTab.toLowerCase()} found.
        </p>
      );
    }

    return data.map((item, index) => (
      <Link
        to={`/info/${item._id || item.id || index}`}
        key={item._id || item.id || index}
        className="block"
      >
        <CardComponent data={item} />
      </Link>
    ));
  };

  return (
    <Layout>
      <main>
        <div className="pt-20">
          {/* Background Banner with Search */}
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
              <SearchBox
                onSearch={handleSearch}
                initialData={initialFormData}
              />
            </div>
          </div>

          {/* Tabs Header */}
          <div className="mt-20 text-center">
            <div className="flex justify-center gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer px-6 py-2 font-semibold border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="min-h-[50vh] mt-10">
            <div className="md:px-20 px-5 flex items-center justify-between">
              <h2 className="md:text-3xl text-xl font-bold">
                {activeTab} Results
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 md:px-20 pb-20">
              {renderCards()}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Search;
