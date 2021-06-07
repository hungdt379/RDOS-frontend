import React, {useState} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {Link} from "react-router-dom";

const DrinkMenu = (props) => {

    return (
        <React.Fragment>
            <div className="title-menu"><b>Đồ uống</b></div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Coca</b></div>
                    <div className="item-cost">10.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-drink">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Rượu táo mèo</b></div>
                    <div className="item-cost">50.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-drink">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Rượu nếp trắng</b></div>
                    <div className="item-cost">50.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-drink">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Bia lon</b></div>
                    <div className="item-cost">15.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-drink">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DrinkMenu;