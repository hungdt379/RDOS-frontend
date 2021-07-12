import React, {useState, Component, useEffect} from "react";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import "../../../assets/scss/custom/pages/waiter/Confirmed.scss";
import {Link} from "react-router-dom";
import NotFound from "../../Authentication/Page401";

const ConfirmedOrder = (props) => {

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
    }, []);

    console.log('role :' + role);

    return(
        <React.Fragment>
            {(role === 'w')?(
                <div>

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
                    <div className="form">
                        <h2>Confirmed Order</h2>
                        <div className="list-Item">
                            <ul>
                                <li>
                                    <span>Tên Món</span>
                                    <span>số lượng</span>
                                    <div className="contain_button">
                                        <label>
                                            X
                                        </label>
                                        <div className="form-label" >
                                            <label>-</label>
                                            <p>1</p>
                                            <label>+</label>
                                        </div>


                                    </div>


                                </li>

                                <li>

                                    <span>Tên Món</span>
                                    <span>số lượng</span>
                                    <div className="contain_button">
                                        <label>
                                            X
                                        </label>
                                        <div className="form-label" >
                                            <label>-</label>
                                            <p>1</p>
                                            <label>+</label>
                                        </div>


                                    </div>

                                </li>

                                <li>
                                    <span>Tên Món</span>
                                    <span>số lượng</span>
                                    <div className="contain_button">
                                        <label>
                                            X
                                        </label>
                                        <div className="form-label" >
                                            <label>-</label>
                                            <p>1</p>
                                            <label>+</label>
                                        </div>


                                    </div>

                                </li>

                                <li>
                                    <span>Tên Món</span>
                                    <span>số lượng</span>
                                    <div className="contain_button">
                                        <label>
                                            X
                                        </label>
                                        <div className="form-label" >
                                            <label>-</label>
                                            <p>1</p>
                                            <label>+</label>
                                        </div>


                                    </div>


                                </li>

                            </ul>
                        </div>
                        <button>Lưu</button>
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    );
}

export default ConfirmedOrder;