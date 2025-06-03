import { useEffect, useState } from "react";
import { Settings, User, Menu, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";

const Sidebar = ({ isOpen }) => {
  const { currentAdmin } = useAdminAuth();

  const busLayout = [
    {
      id: 1,
      link: "/bus/admin/dashboard",
      linkName: "📦 Dashboard",
    },
    {
      id: 2,
      link: "/bus/admin/create",
      linkName: "📦 Create Bus Shedule",
    },
    {
      id: 3,
      link: "/bus/admin/dashboard",
      linkName: "📦 List Buses",
    },
  ];
  const hotelLayout = [
    {
      id: 1,
      link: "/hotel/admin/dashboard",
      linkName: "📦 Dashboard",
    },
    {
      id: 2,
      link: "/hotel/admin/create",
      linkName: "📦 Create Room",
    },
    {
      id: 3,
      link: "/hotel/admin/dashboard",
      linkName: "📦 List Rooms",
    },
  ];
  const flightLayout = [
    {
      id: 1,
      link: "/flight/admin/dashboard",
      linkName: "📦 Dashboard",
    },
    {
      id: 2,
      link: "/flight/admin/create",
      linkName: "📦 Create Flight",
    },
    {
      id: 3,
      link: "/flight/admin/dashboard",
      linkName: "📦 List Flights",
    },
  ];

  const LinkList = ({ layout }) => {
    return (
      <ul className="flex flex-col space-y-4">
        {layout.map((item) => (
          <Link key={item.id} to={item.link}>
            <li className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition flex items-center gap-3">
              {item.linkName}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 p-6 shadow-xl flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <h2 className="text-xl font-semibold mb-8 tracking-wide">WanderSphere</h2>

      {currentAdmin?.domain === "Hotel" && <LinkList layout={hotelLayout} />}
      {currentAdmin?.domain === "Bus" && <LinkList layout={busLayout} />}
      {currentAdmin?.domain === "Flight" && <LinkList layout={flightLayout} />}
    </div>
  );
};

const TopBar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentAdmin } = useAdminAuth();
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md relative px-6">
      <button
        className="md:hidden p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <p>{currentAdmin?.username}</p>
        <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
          <User size={20} />
        </button>
        <button
          className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Settings size={20} />
        </button>
      </div>
      {dropdownOpen && (
        <div className="absolute right-6 top-12 bg-white text-black shadow-lg rounded-lg w-40 py-2 overflow-hidden">
          <button className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all">
        <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-8 text-gray-800 text-lg">{children}</div>
      </div>
    </div>
  );
}
