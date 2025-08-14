// src/routes/RouteWrapper.tsx
import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import Loader from "../components/Loader";

const RouteWrapper = () => {
  const routes = useRoutes(appRoutes);

  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      {routes}
    </Suspense>
  );
};

export default RouteWrapper;
