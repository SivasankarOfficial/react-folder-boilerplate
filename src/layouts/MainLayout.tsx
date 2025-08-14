import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/rootReducer";
import Loader from "../components/Loader";
import Header from "./header"; // For dashboard
import Footer from "./Footer"; // For dashboard
import PublicHeader from "./PublicHeader"; // New public header
// import PublicFooter from "./PublicFooter"; // New public footer

const MainLayout = () => {
  const loading = useSelector((state: RootState) => state.load.loading);
  const location = useLocation();

  // Define public routes here
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <div>
      {isPublicPage ? <PublicHeader /> : <Header />}
      {loading && location.state?.isRouteChanging && <Loader />}

      <main className="min-h-screen mt-10 p-4">
        <Outlet />
      </main>
      <Footer />
      {/* {isPublicPage ? <PublicFooter /> : } */}
    </div>
  );
};

export default MainLayout;
