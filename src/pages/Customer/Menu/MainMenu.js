import React, {useState} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {Link} from "react-router-dom";

const MainMenu = (props) => {

    return (
        <React.Fragment>
            <div className="title-menu"><b>Combo nướng + lẩu</b></div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Combo Nướng 129k</b></div>
                    <div className="item-cost">129.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-combo">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Combo Nướng 169k</b></div>
                    <div className="item-cost">169.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-combo">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Combo Nướng + Lẩu</b></div>
                    <div className="item-cost">209.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-combo">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Combo Nướng + Lẩu</b></div>
                    <div className="item-cost">209.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <Link to="/customer-detail-combo">
                        <button className="add-btn">
                            <div>+</div>
                        </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainMenu;