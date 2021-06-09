import React, {useState, Component, useEffect} from "react";
import {Link} from "react-router-dom";

const ChangeTable = (props) =>{
    return(
        <React.Fragment>
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
            <div style={{textAlign: "center", justifyContent: "center"}}>
                <h2>Danh sách Bàn trống</h2>
                <div className="list-Item">
                    <ul>
                        <li>
                            <span>Mã Bàn</span>


                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>
                        <li>
                            <span>Mã Bàn</span>

                        </li>


                    </ul>

                </div>
                <button>Lưu</button>
            </div>
        </React.Fragment>
    );
}

export default ChangeTable;