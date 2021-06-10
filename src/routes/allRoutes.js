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

import DetailCombo from "../pages/Customer/Detail/DetailCombo";
import DetailDrink from "../pages/Customer/Detail/DetailDrink";
import App from "../App";
import Cart from "../pages/Customer/Cart";
import SeeOrder from "../pages/Customer/SeeOrder/index";
import DetailItemOrder from "../pages/Customer/SeeOrder/DetailOrder";
import Feedback from "../pages/Customer/Feedback";
import OrderList from "../pages/Receptionist/OrderList";
import ViewFeedback from "../pages/Receptionist/ViewFeedback";

export const userRoutes = [
    {path: "/customer-menu", component: CustomerMenu},
    {path: "/customer-home", component: CustomerHome},
    {path: "/customer-detail-combo", component: DetailCombo},
    {path: "/customer-detail-drink", component: DetailDrink},
    {path: "/customer-cart", component: Cart},
    {path: "/customer-see-order", component: SeeOrder},
    {path: "/customer-detail-item", component: DetailItemOrder},
    {path: "/customer-feedback", component: Feedback},
    {path: "/receptionist-home", component: OrderList},
    {path: "/receptionist-feedback", component: ViewFeedback},
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
