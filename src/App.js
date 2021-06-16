import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {
    Switch,
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import {connect} from "react-redux";

import * as actions from "./store/actions";
import {
    customerRoutes,
    userRoutes,
    authRoutes
} from "./routes/allRoutes";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import RdosCustomerLayout from "./components/RdosCustomerLayout/index";
import NonAuthLayout from "./components/NonAuthLayout";
import "./assets/scss/theme.scss";
import NotFound from "./pages/Authentication/Page401";
import AuthCustomer from "./routes/middleware/AuthCustomer";

const App = (props) => {
    const dispatch = useDispatch();

    function getLayout() {
        let layoutCls = RdosCustomerLayout;
        switch (props.layout.layoutType) {
            default:
                layoutCls = RdosCustomerLayout;
                break;
        }
        return layoutCls;
    }

    const Layout = getLayout();

    const NonAuthMiddleware = ({
                                   component: Component,
                                   layout: Layout
                               }) => (
        <Route
            render={props => {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }}
        />
    );

    return (
        <React.Fragment>
            <Switch>
                {authRoutes.map((route, idx) => (
                    <NonAuthMiddleware
                        path={route.path}
                        layout={NonAuthLayout}
                        component={route.component}
                        key={idx}
                        login={props.login}
                    />
                ))}

                {customerRoutes.map((route, idx) => (
                    <AuthCustomer
                        path={route.path}
                        layout={Layout}
                        component={route.component}
                        key={idx}
                    />
                ))}

                {userRoutes.map((route, idx) =>  (
                    <AuthMiddleware
                        path={route.path}
                        layout={Layout}
                        component={route.component}
                        key={idx}
                        login={props.login}
                    />
                ))}

                <Route path={"/not-found"} component={NotFound}/>
                <Redirect to="/not-found"/>
            </Switch>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        layout: state.Layout,
    };
};

export default connect(mapStateToProps, null)(App);
