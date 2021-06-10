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
import  KitchenOrderList from "../pages/Kitchen/OrderList/index"
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
import KitchenMenu from "../pages/Kitchen/MenuManagement";

export const userRoutes = [
    {
        path: "/customer-menu", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? CustomerMenu : Invalid
    },
    {
        path: "/customer-home", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? CustomerHome : Invalid
    },
    {
        path: "/customer-detail-combo", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? DetailCombo : Invalid
    },
    {
        path: "/customer-detail-drink", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? DetailDrink : Invalid
    },
    {
        path: "/customer-cart", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? Cart : Invalid
    },
    {
        path: "/customer-see-order", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? SeeOrder : Invalid
    },
    {
        path: "/customer-detail-item", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? DetailItemOrder : Invalid
    },
    {
        path: "/customer-feedback", component: (window.innerWidth <= 900 && window.innerWidth / window.innerHeight <= 2.2)
            ? Feedback : Invalid
    },
    //path kitchen
    {
        path: "/kitchen-home", component: KitchenOrderList
    },
    {
      path:"/kitchen-menu" , component: KitchenMenu
    },
    {
        path: "/receptionist-home", component: OrderList
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
