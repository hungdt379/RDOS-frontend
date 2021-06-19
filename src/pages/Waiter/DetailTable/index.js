import React, {useState, Component, useEffect} from "react";
import {Link, Route, Router, Switch} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import ConfirmOrder from "./ConfirmOrder";
import NotFound from "../../Authentication/Page401";

function DetailTable (){

    const [role, setrole] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
    }, []);



    return(
        <React.Fragment>
            {(role === 'w')?(
                <div>
                    <div className="MyContainer">
                        <Link to="/waiter-view-all-table">
                            <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
                        </Link>

                        <div className="form-role">

                            <div className="role">
                                <a>MB01</a>
                                <p>Mật khẩu</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className="nav-notification">
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
                    <div style={{display: "flex",justifyContent: "center"}}>
                        <p style={{marginRight: "40px"}}>Số Khách Tại Bàn: 4</p>
                        <button>Change</button>
                    </div>

                    <div className="form">
                        <h2>Trang Chi Tiết</h2>
                        <div className="list-Item">
                            <ul>
                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item" >
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                            </ul>
                        </div>
                        <button>Hủy</button>
                        <button>Xác Nhận</button>
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    );

};

export default DetailTable;