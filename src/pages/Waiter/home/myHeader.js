import {Link, withRouter} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {getLogOutRequest} from "../../../store/notifications/actions";
import {apiError} from "../../../store/auth/login/actions";

// scss
import "../../../assets/scss/custom/pages/waiter/header.scss";
//image
import toggle from "../../../assets/images/receptionist/profile.png";
import home from  "../../../assets/images/customer/home.png";

const myHeader = (props) => {

    const logout = () => {
        props.getLogOutRequest();
    }

    return(
        <div className="MyHeader">
            <Link to="/waiter-view-all-table" className="div-table-code">
                <img style={{width: '18px', height: '20px'}} src={home}/>
            </Link>
                <div className="title_header">
                  <p>{(props.username) ? props.username : "ALL Tables" }</p>
                </div>
                <div className="toggle">
                    <img src={toggle}/>
                    <div className="dropdown-content">
                            <Link to="/login" onClick={logout}>Log Out</Link>
                    </div>
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