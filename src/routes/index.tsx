import { Route } from "react-router-dom";
import * as React from "react";

import Home from "@pages/Home";
import Admin from "@pages/Admin";
import Auth from "@pages/Admin/Auth";
import Dashboard from "@pages/Admin/DashBoard";
import ListMovie from "@pages/Home/List";
import Detail from "@pages/Home/Detail";

type RouteElement =
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;

export type AppRoute = {
    path: string;
    element: RouteElement;
    children?: AppRoute[];
};

const routes: AppRoute[] = [
    {
        path: "",
        element: Home as RouteElement,
        children: [
            { path: "", element: ListMovie as RouteElement },
            { path: "detail/:id", element: Detail as RouteElement }, // 👈 ép kiểu ở đây
        ],
    },
    {
        path: "admin",
        element: Admin as RouteElement,
        children: [{ path: "dashboard", element: Dashboard as RouteElement }],
    },
    { path: "auth", element: Auth as RouteElement },
];

export const renderRoutes = () =>
    routes.map((route, idx) => {
        const Element = route.element;
        return route.children?.length ? (
            <Route key={idx} path={route.path} element={<Element />}>
                {route.children.map((child, cidx) => {
                    const ChildElement = child.element;
                    return <Route key={cidx} path={child.path} element={<ChildElement />} />;
                })}
            </Route>
        ) : (
            <Route key={idx} path={route.path} element={<Element />} />
        );
    });
