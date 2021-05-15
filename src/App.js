import React from "react";
import { useDispatch } from "react-redux";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions";
import { userRoutes, authRoutes } from "./routes/allRoutes";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import ThanksLayout from "./components/ThanksLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import "./assets/scss/theme.scss";
import NotFound from "./pages/Authentication/Page401";

const App = (props) => {
  const dispatch = useDispatch();
  function getLayout() {
    let layoutCls = ThanksLayout;
    switch (props.layout.layoutType) {
      default:
        layoutCls = ThanksLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();

  const NonAuthMiddleware = ({
    component: Component,
    layout: Layout,
    login,
    path,
  }) => {
    if (
      login.loading === true &&
      login.auth === false &&
      login.authUser != " "
    ) {
      return <Redirect to={{ pathname: "/loading" }} />;
    }

    return (
      <Route
        path={path}
        render={(props) => {
          if (login.loading === false && login.auth === true) {
            setTimeout(() => {
              props.history.push("/home");
            }, 3000);
          }
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }}
      />
    );
  };

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

        {userRoutes.map((route, idx) => (
          <AuthMiddleware
            path={route.path}
            layout={Layout}
            component={route.component}
            key={idx}
            login={props.login}
          />
        ))}

        <Route path={"/not-found"} component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
    login: state.Login || {},
  };
};

export default connect(mapStateToProps)(App);
