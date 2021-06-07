import React, {useState} from "react";

import {Link} from "react-router-dom";

//Import scss
import "../../../assets/scss/custom/pages/customer/home.scss";

const CustomerHome = (props) => {

    return (
        <React.Fragment>
            <div className="v4_1">
                <div className="d-flex header-home">
                    <div className="table-code">MB01</div>
                    <div className="system">RDOS</div>
                </div>

                <div align='center' className="info">
                    <div className="v56_0">XIN CHÀO QUÝ KHÁCH</div>
                    <div className="v56_1">Rất hân hạnh được phục vụ Quý Khách</div>
                </div>

                <Link to="/customer-menu">
                    <button className="menu-button d-flex">
                        <div className="icon">(icon)</div>
                        <div className="text-button">Xem Menu - Gọi món</div>
                    </button>
                </Link>

                <div className="d-flex">
                    <Link align="center" className="square-button">
                        <button style={{backgroundColor:'#50a5f1', borderRadius: '10px', width:'100%'}}>
                            <div className="square-icon">(icon)</div>
                            <div className="square-text-button">Gọi thanh toán</div>
                        </button>
                    </Link>
                    <Link align="center" className="square-button">
                        <button style={{backgroundColor:'#50a5f1', borderRadius: '10px', width:'100%'}}>
                            <div className="square-icon">(icon)</div>
                            <div className="square-text-button">Gọi phục vụ</div>
                        </button>
                    </Link>
                    <Link align="center" className="square-button" to="/customer-feedback">
                        <button style={{backgroundColor:'#50a5f1', borderRadius: '10px', width:'100%'}}>
                            <div className="square-icon">(icon)</div>
                            <div className="square-text-button">Đánh giá</div>
                        </button>
                    </Link>
                </div>

                <Link to="/customer-see-order">
                    <button className="menu-button d-flex">
                        <div className="icon">(icon)</div>
                        <div className="text-button">Xem Order</div>
                    </button>
                </Link>
            </div>

        </React.Fragment>
    );
};

export default CustomerHome;