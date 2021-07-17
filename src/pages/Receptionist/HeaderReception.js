import React,{useState} from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import "../../assets/scss/custom/pages/receptionist/receptionist.scss";

// Import menuDropdown
import NotificationDropdown from "./NotificationDropdown";
import ProfileMenu from "./ProfileMenu";

//i18n
import { withNamespaces } from 'react-i18next';
import imageItem from "../../assets/images/customer/logo-web.jpg";
import NotificationFooter from "./NotificationFooter";
import carousel from "../../assets/images/receptionist/carousel.png";
import awards from "../../assets/images/receptionist/awards.png";
import tableManage from "../../assets/images/receptionist/display-spacing.png";
import profile from "../../assets/images/receptionist/profile.png";

const Header = (props) => {

    return (
        <React.Fragment>
            <header id="page-topbar" className="background-header">
                <div className="navbar-header top-header thanks-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/receptionist-home" className="logo logo-dark d-flex menu-type-a-re">
                                <button className="d-flex menu-type-re">
                                    <NotificationFooter/>
                                    <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                         className="avatar-sm profile-user-wid mr-2">
                                        <div align="center"
                                             className="avatar-title rounded-circle header-re-icon">
                                            <img src={carousel} className="icon-button-menu-re"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button-re"><b>Xem Order</b></div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/receptionist-feedback" className="logo logo-dark d-flex menu-type-a-re">
                                <button className="d-flex menu-type-re">
                                    <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                         className="avatar-sm profile-user-wid mr-2">
                                        <div align="center"
                                             className="avatar-title rounded-circle header-re-icon">
                                            <img src={awards} className="icon-button-menu"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button-re"><b>Xem Đánh giá</b></div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/receptionist-manage" className="logo logo-dark d-flex menu-type-a-re">
                                <button className="d-flex menu-type-re">
                                    <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                         className="avatar-sm profile-user-wid mr-2">
                                        <div align="center"
                                             className="avatar-title rounded-circle header-re-icon">
                                            <img src={tableManage} className="icon-button-menu"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button-re"><b>Quản lý bàn</b></div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <NotificationDropdown/>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}

// const mapStatetoProps = state => {
//     const { layoutType,showRightSidebar, leftMenu } = state.Layout;
//     return { layoutType,showRightSidebar,leftMenu };
// };

// export default connect(mapStatetoProps, { showRightSidebarAction,toggleLeftmenu })(withNamespaces()(Header));
export default Header;