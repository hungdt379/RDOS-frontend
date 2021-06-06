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
                    <button className="square-button">
                        <div className="square-icon">(icon)</div>
                        <div className="square-text-button">Gọi thanh toán</div>
                    </button>
                    <button className="square-button">
                        <div className="square-icon">(icon)</div>
                        <div className="square-text-button">Gọi phục vụ</div>
                    </button>
                    <button className="square-button">
                        <div className="square-icon">(icon)</div>
                        <div className="square-text-button">Gọi thanh toán</div>
                    </button>
                </div>

                <button className="menu-button d-flex">
                    <div className="icon">(icon)</div>
                    <div className="text-button">Xem Order</div>
                </button>
            </div>

        </React.Fragment>
    );
};

export default CustomerHome;