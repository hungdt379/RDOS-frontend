import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";

function DetailItemOrder() {

    return (
        <React.Fragment>
            <div className="header-detail d-flex">
                <div align="left" className="col-sm-3 col-md-2">
                    <Link to="/customer-see-order">
                        <button style={{height: '33px'}}>
                            <div>
                                <b>Back</b>
                            </div>
                        </button>
                    </Link>
                </div>
                <div style={{paddingTop: '8px'}} align="center" className="col-sm-6 col-md-8">

                </div>
                <div align="right" className="col-sm-3 col-md-2">
                </div>
            </div>

            <div>
                <div className="title-menu"><b>Combo Nướng 129k</b></div>
                <div style={{height: 'auto'}} className="item-menu">
                    <div className="d-flex">
                        <div align="left" className="col-8">
                            <div className="item-cost">Ba chỉ bò</div>
                        </div>
                        <div align="center" className="add-button col-4">
                            (status)
                        </div>
                    </div>
                    <div className="d-flex">
                        <div align="left" className="col-8">
                            <div className="item-cost">Ba chỉ lợn</div>
                        </div>
                        <div align="center" className="add-button col-4">
                            (status)
                        </div>
                    </div>
                    <div className="d-flex">
                        <div align="left" className="col-8">
                            <div className="item-cost">Sụn</div>
                        </div>
                        <div align="center" className="add-button col-4">
                            (status)
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default DetailItemOrder;