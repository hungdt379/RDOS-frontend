import React from "react";
import {Redirect} from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import NotFound from "../pages/Authentication/Page401";

import Loading from "../pages/Authentication/Loading";

// Customer Home page
import CustomerHome from "../pages/Customer/Home";

//Customer Menu page
import CustomerMenu from "../pages/Customer/Menu/index";

// Customer Invalid page
import Invalid from "../pages/Customer/Invalid";
import App from "../App";

export const userRoutes = [
    {
        path: "/customer-menu", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? CustomerMenu : Invalid
    },
    {
        path: "/customer-home", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? CustomerHome : Invalid
    },
    // this route should be at the end of all other routes
    {path: "/", exact: true, component: () => <Redirect to="/customer-home"/>}
];

export const authRoutes = [
    {path: "/logout", component: Logout},
    {path: "/login", component: Login},
    {path: "/forget-password", component: ForgetPwd},
    {path: "/register", component: Register},
    {path: "/loading", component: Loading},
    {path: "/not-found", component: NotFound},
];
