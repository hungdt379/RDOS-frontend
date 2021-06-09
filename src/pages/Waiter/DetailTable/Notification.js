import React, {useState, Component, useEffect} from "react";
import {Link} from "react-router-dom";

const Notification = (props) => {
    return(
        <React.Fragment>
            <div className="MyContainer">
                <Link to="/waiter-view-all-table">
                    <h3 style={{paddingLeft: "30px"}}>RDOS</h3>
                </Link>

                <div className="form-role">

                    <div className="role">
                        <a>MB01</a>
                        <p>Mật khẩu</p>
                    </div>
                </div>
            </div>
            <div>
                <ul className="nav">
                    <li>
                        <Link to="/waiter-detail-table-notification">Thông báo</Link>
                    </li>
                    <li>
                        <Link to="/waiter-detail-table">Confirm order</Link>
                    </li>
                    <li>
                        <Link to="/waiter-detail-table-change-table">Đổi Bàn</Link>
                    </li>
                    <li>
                        <Link to="/waiter-detail-table-confirmed-order">Confirmed order</Link>
                    </li>
                </ul>
            </div>
            <div style={{textAlign: "center", justifyContent: "center"}}>
                <h2>Trang Thông Báo</h2>
                <div className="list-Item">
                    <ul>
                        <li>
                            <span>Gọi Hỗ Trợ</span>
                            <span>Nội dung</span>
                            <span></span>
                        </li>
                        <li>
                            <span>Gọi Thanh Toán</span>
                            <span>Nội dung</span>
                            <span></span>
                        </li>
                        <li>
                            <span>Gọi Hỗ Trợ</span>
                            <span>Nội dung</span>
                            <span></span>
                        </li>
                        <li>
                            <span>Gọi Thanh Toán</span>
                            <span>Nội dung</span>
                            <span></span>
                        </li>

                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Notification;