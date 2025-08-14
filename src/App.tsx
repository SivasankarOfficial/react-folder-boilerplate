import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteWrapper from "./routes/RouteWrapper";
import Loader from "./components/Loader";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <RouteWrapper />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
