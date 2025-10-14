import { Routes } from "react-router-dom";
import {renderRoutes} from "@/routes";

export default function App() {
    return <Routes>{renderRoutes()}</Routes>;
}
