import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import { useUserAuth } from "./context/UserAuthContext";

export default function Layout({ children, showFooter = true }) {
  const { currentUser } = useUserAuth();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar user={currentUser} />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
