import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";

function Cart() {

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-detail d-flex">
                    <div align="left" className="col-sm-3 col-md-2">
                        <Link to="/customer-menu">
                            <button style={{height: '33px'}}>
                                <div>
                                    <b>Back</b>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div style={{paddingTop: '8px'}} align="center" className="col-sm-6 col-md-8">
                        <b>Món đã chọn</b>
                    </div>
                    <div align="right" className="col-sm-3 col-md-2">
                        <Link>
                            <button style={{height: '33px'}}>
                                <div>
                                    <b>Xóa hết</b>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="title-menu"><b>Số người: 2</b></div>
                    <Link to="/customer-detail-combo">
                        <div className="item-menu d-flex">
                            <div align="left" className="col-8">
                                <div className="item-name"><b>Combo Nướng 129k</b></div>
                                <div className="item-cost">258.000 vnd</div>
                            </div>
                            <div align="center" className="add-button col-2">
                                x2
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link>
                                    <div>xóa</div>
                                </Link>
                            </div>
                        </div>
                    </Link>
                    <Link to="/customer-detail-drink">
                        <div className="item-menu d-flex">
                            <div align="left" className="col-8">
                                <div className="item-name"><b>Coca</b></div>
                                <div className="item-cost">20.000 vnd</div>
                            </div>
                            <div align="center" className="add-button col-2">
                                x2
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link>
                                    <div>xóa</div>
                                </Link>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="d-flex order-drink">
                    <div style={{paddingTop: '10px'}} align="left" className="col-6">
                        <b style={{color: '#000000'}}>Tổng tiền: 278.000vnd</b>
                    </div>
                    <div align="right" className="col-6">
                        <Link to="/customer-home">
                            <button className="order-button-drink">
                                <div>Gửi yêu câu đặt món</div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

export default Cart;