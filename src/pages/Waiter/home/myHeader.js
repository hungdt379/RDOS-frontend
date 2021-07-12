import {Link, withRouter} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {getLogOutRequest} from "../../../store/notifications/actions";
import {apiError} from "../../../store/auth/login/actions";


const myHeader = (props) => {

    const logout = () => {
        props.getLogOutRequest();
    }

    return(
        <div className="MyContainer">
            <Link to="/waiter-view-all-table">
                <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
            </Link>

            <div className="form-role">
                <Link to="/waiter-check-list" className="myButton">Check List</Link>
                <div className="role">
                    <a>{(props.username) ? props.username : "nhân viên" }</a>
                    <p>UserName</p>

                </div>
                <Link to="/login" onClick={logout}>Log Out</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dataLogout : state.Notification.LogOut.dataLogOut
    };
};

export default withRouter(connect(mapStateToProps, {getLogOutRequest,apiError})(myHeader));