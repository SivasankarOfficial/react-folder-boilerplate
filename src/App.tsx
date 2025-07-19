import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteWrapper from "./routes/RouteWrapper";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <RouteWrapper />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
