import { Route } from "react-router-dom";
import * as React from "react";

import MainLayout from "@components/Layouts";
import Home from "@pages/Home";
import Detail from "@pages/Home/Detail";
import RoomTicket from "@pages/Home/RoomTicket";
import Login from "@pages/Home/Auth/Login";
import Register from "@pages/Home/Auth/Register";
import Auth from "@pages/Admin/Auth";
import NotFound from "@components/NotFound";
import Profile from "@pages/Home/Profile";
import TicketBook from "@pages/Home/TicketBook";
import Showtimes from "@pages/Home/Showtimes";
import AdminLayout from "@pages/Admin/_components/AdminLayout";
import Admin from "@pages/Admin";
import Showtime from "@pages/Admin/Film/Showtime";
import Film from "@pages/Admin/Film";
import User from "@pages/Admin/User";


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
        element: MainLayout as RouteElement,
        children: [
            { path: "", element: Home as RouteElement },
            { path: "detail/:id", element: Detail as RouteElement },
            { path: "showtimes", element: Showtimes as RouteElement },
            { path: "ticket-room/:id", element: RoomTicket as RouteElement },
            { path: "login", element: Login as RouteElement },
            { path: "register", element: Register as RouteElement },
            { path: "profile", element: Profile as RouteElement },
            { path: "my-tickets", element: TicketBook as RouteElement}
        ],
    },
    {
        path: "admin",
        element: AdminLayout as RouteElement,
        children: [
            { path: "", element: Admin as RouteElement },
            { path: "user", element: User as RouteElement },
            { path: "film", element: Film as RouteElement,
                children: [
                    { path: "showtime/:id", element: Showtime as RouteElement },
                ]
            },
        ],
    },
    { path: "auth", element: Auth as RouteElement },

    { path: "*", element: NotFound as RouteElement }

];

export const renderRoutes = () => (
        routes.map((route, idx) => {
            const Element = route.element;
            return route.children?.length ? (
                <Route key={idx} path={route.path} element={<Element />}>
                    {route.children.map((child, cidx) => {
                        const ChildElement = child.element;
                        return (
                            <Route key={cidx} path={child.path} element={<ChildElement />} />
                        );
                    })}
                </Route>
            ) : (
                <Route key={idx} path={route.path} element={<Element />} />
            );
        })
);
