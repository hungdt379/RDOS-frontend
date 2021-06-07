import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";

function SeeOrder() {

    return (
        <React.Fragment>
            <div className="header-detail d-flex">
                <div align="left" className="col-sm-3 col-md-2">
                    <Link to="/customer-home">
                        <button style={{height: '33px'}}>
                            <div>
                                <b>Back</b>
                            </div>
                        </button>
                    </Link>
                </div>
                <div style={{paddingTop: '8px'}} align="center" className="col-sm-6 col-md-8">
                    <b>Món đã gọi</b>
                </div>
                <div align="right" className="col-sm-3 col-md-2">
                </div>
            </div>

            <div>
                <div className="title-menu"><b>Số người: 2</b></div>
                <Link to="/customer-detail-item">
                    <div className="item-menu d-flex">
                        <div align="left" className="col-8">
                            <div className="item-name"><b>Combo Nướng 129k</b></div>
                            <div className="item-cost">258.000 vnd</div>
                        </div>
                        <div align="center" className="add-button col-2">
                            x2
                        </div>
                        <div align="right" className="add-button col-2">
                        </div>
                    </div>
                </Link>
                <Link>
                    <div className="item-menu d-flex">
                        <div align="left" className="col-8">
                            <div className="item-name"><b>Combo Nướng 169k</b></div>
                            <div className="item-cost">20.000 vnd</div>
                        </div>
                        <div align="center" className="add-button col-2">
                            x2
                        </div>
                        <div align="right" className="add-button col-2">
                        </div>
                    </div>
                </Link>
            </div>

        </React.Fragment>
    );
};

export default SeeOrder;