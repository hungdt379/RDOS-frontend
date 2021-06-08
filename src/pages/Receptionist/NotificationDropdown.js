import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
//Import scss
import "../../assets/scss/custom/pages/receptionist/receptionist.scss";
import { connect } from "react-redux";

import NotificationCard from "./NotificationCard";

//i18n
import { withNamespaces } from "react-i18next";

const NotificationDropdown = (props) => {
    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);
    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="dropdown d-inline-block"
                tag="li"
            >
                <DropdownToggle
                    className="btn header-item noti-icon waves-effect"
                    tag="button"
                    id="page-header-notifications-dropdown"
                >
                    <i style={{color:"#000000"}} className="bx bx-bell bx-tada"></i>
                    <span className="badge badge-danger badge-pill">
            2
          </span>
                </DropdownToggle>

                <DropdownMenu
                    className="dropdown-menu dropdown-menu-lg dropdown-thanks-notification p-0"
                    right
                >
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0"> Thông báo </h6>
                            </Col>
                            <div className="col-auto">
                                <a href="#!" className="small">
                                    {" "}
                                    Đánh dấu xem hết
                                </a>
                            </div>
                        </Row>
                    </div>
                    <PerfectScrollbar style={{ height: "300px" }}>
                        <NotificationCard/>
                        <NotificationCard/>
                        <div className="p-2 border-top">
                            <Link
                                className="btn btn-sm btn-link font-size-14 btn-block text-center"
                                to="#"
                            >
                                Xem thêm
                            </Link>
                        </div>
                    </PerfectScrollbar>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

// export default withNamespaces()(connect(mapStateToProps)(NotificationDropdown));
export default NotificationDropdown;