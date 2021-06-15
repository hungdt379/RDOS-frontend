import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { loadState } from "../../store/localStorage";

const AuthCustomer = ({
                            component: Component,
                            layout: Layout,
                            login,
                            path,
                        }) => (
    <Route
        path={path}
        render={(props) => {
            // if (
            //   !login.authUser.token ||
            //   login.isLogout === true ||
            //   !loadState().token
            // ) {
            //   return (
            //     <Redirect
            //       to={{ pathname: "/login", state: { from: props.location } }}
            //     />
            //   );
            // }
            return (
                <Layout>
                    <Component {...props} />
                </Layout>
            );
        }}
    />
);

export default withRouter(AuthCustomer);
