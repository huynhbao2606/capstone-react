import { Route } from "react-router-dom";
import * as React from "react";

import Home from "@pages/Home";
import Movie from "@pages/Home/Movie";
import Admin from "@pages/Admin";
import Auth from "@pages/Admin/Auth";
import Dashboard from "@pages/Admin/DashBoard";

export type AppRoute = {
    path: string;
    element: React.ElementType;
    children?: AppRoute[];
};

const routes: AppRoute[] = [
    {
        path: "",
        element: Home,
        children: [
            { path: "", element: Movie },
        ],
    },
    {
        path: "admin",
        element: Admin,
        children: [
            { path: "dashboard", element: Dashboard },
        ],
    },
    {
        path: "auth",
        element: Auth,
    },
];

export const renderRoutes  = () =>
    routes.map((route, idx) => {
        const Element = route.element;

        if (route.children && route.children.length > 0) {
            return (
                <Route key={idx} path={route.path} element={<Element />}>
                    {route.children.map((child, cidx) => {
                        const ChildElement = child.element;
                        return (
                            <Route
                                key={cidx}
                                path={child.path}
                                element={<ChildElement />}
                            />
                        );
                    })}
                </Route>
            );
        }

        return <Route key={idx} path={route.path} element={<Element />} />;
    });
