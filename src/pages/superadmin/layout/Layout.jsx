import { useState } from "react";
import { Settings, User, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../../components/common/Toast";
import { useSuperAdminC } from "../../../context/SuperAdminContext";
import CreateSuperAdminModal from "../../../components/admin/createSuperAdminModal";

const LinkList = ({ LinkLayout }) => {
  return (
    <>
      <ul className="flex flex-col space-y-4">
        {LinkLayout.map((item) => (
          <Link key={item.id} to={item.link}>
            <li className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition flex items-center gap-3">
              {item.linkName}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

const Sidebar = ({ isOpen }) => {
  const LinkLayout = [
    {
      id: 1,
      link: "/super-admin/dashboard",
      linkName: "📦 Dashboard",
    },
    {
      id: 2,
      link: "/super-admin/verify",
      linkName: "📦 Verify Services",
    },
    {
      id: 3,
      link: "/super-admin/verified",
      linkName: "📦 Verified Services",
    },
    {
      id: 4,
      link: "/super-admin/denied",
      linkName: "📦 Denied Services",
    },
    {
      id: 5,
      link: "/all",
      linkName: "📦 All Super Admin",
    },
  ];

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 p-6 shadow-xl flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <h2 className="text-xl font-semibold mb-8 tracking-wide">WanderSphere</h2>
      <LinkList LinkLayout={LinkLayout} />
    </div>
  );
};

const TopBar = ({ toggleSidebar, modal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, currSuperAdmin } = useSuperAdminC();
  const navigate = useNavigate();
  const superAdmin = currSuperAdmin;
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
        <p>{superAdmin?.username}</p>
        <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
          <User size={20} />
        </button>
        <button
          className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition focus:outline-none  cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Settings size={20} />
        </button>
      </div>
      {dropdownOpen && (
        <div className="absolute right-6 top-16 bg-white text-black shadow-lg rounded-lg w-40 py-2 overflow-hidden">
          <button
            onClick={() => {
              setDropdownOpen(false);
              modal();
            }}
            className="cursor-pointer block w-full text-left px-4 py-3 hover:bg-gray-100 transition"
          >
            Set New Admin
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/super-admin/login");
            }}
            className="cursor-pointer block w-full text-left px-4 py-3 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default function SuperAdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all">
        <TopBar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          modal={openModal}
        />
        <div className="p-8 text-gray-800 text-lg">{children}</div>
      </div>

      <CreateSuperAdminModal isOpen={isModalOpen} onClose={closeModal} />

      <Toast
        result={result}
        setResult={setResult}
        color={"bg-red-500 text-white"}
      />
    </div>
  );
}
