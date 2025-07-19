import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

const RouteWrapper = () => useRoutes(appRoutes);
export default RouteWrapper;
