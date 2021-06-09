import React, {useState, Component} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import NonAuthLayout from "../../../components/NonAuthLayout";
import MainMenu from "./MainMenu";
import DrinkMenu from "./DrinkMenu";
import ExtraMenu from "./ExtraMenu";
import Invalid from "../Invalid";

const CustomerMenu = (props) => {

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div className="d-flex">
                        <div className="home-icon col-2"><Link to="/customer-home">
                            <div>(icon)</div>
                            <div>home</div>
                        </Link></div>
                        <div align="center" className="menu-search col-8"><input className="search-bar" type="text"
                                                                                 name="search" placeholder="Search..."/>
                        </div>
                        <div className="table-header col-2">RDOS</div>
                    </div>
                    <div className="d-flex">
                        <a className="menu-type" href="#combo">
                            <button className="menu-type">
                                <div>Combo</div>
                            </button>
                        </a>
                        <a className="menu-type" href="#drink">
                            <button className="menu-type">
                                <div>Đồ uống</div>
                            </button>
                        </a>
                        <a className="menu-type" href="#extra">
                            <button className="menu-type">
                                <div>Món ăn kèm</div>
                            </button>
                        </a>
                    </div>
                </div>

                <div id="combo"><MainMenu/></div>
                <div id="drink"><DrinkMenu/></div>
                <div id="extra"><ExtraMenu/></div>

                <div className="cart">
                    <Link to="/customer-cart">
                        <button className="cart-button">
                            <div>Xem danh sách món đã chọn</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

export default CustomerMenu;