import React,{useState} from "react";

import { Link } from "react-router-dom";
import "../../assets/scss/custom/pages/receptionist/receptionist.scss";

// Import menuDropdown
import NotificationDropdown from "./NotificationDropDown";
import ProfileMenu from "./ProfileMenu";

//i18n
import { withNamespaces } from 'react-i18next';
import imageItem from "../../assets/images/customer/logo-web.jpg";

const HeaderKitchen = (props) => {

    return (
        <React.Fragment>
            <header id="page-topbar" className="background-header">
                <div className="navbar-header top-header thanks-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/kitchen-home" className="logo logo-dark">
                                <div style={{fontSize:'20px', color:'#000000'}}>
                                    RDOS
                                </div>
                            </Link>

                        </div>

                    </div>

                    <div align="center">
                        <Link to="/kitchen-home">
                            <div>
                                <div style={{color:'#000000'}}>(icon)</div>
                                <div style={{color:'#000000'}}><b>Xem Order</b></div>
                            </div>
                        </Link>
                    </div>

                    <div align="center">
                        <Link to="/kitchen-menu">
                            <div>
                                <div style={{color:'#000000'}}>(icon)</div>
                                <div style={{color:'#000000'}}><b>Quản Lý Menu</b></div>
                            </div>
                        </Link>
                    </div>

                    <div className="d-flex">

                        <NotificationDropdown/>
                        <ProfileMenu />

                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}

export default HeaderKitchen;
