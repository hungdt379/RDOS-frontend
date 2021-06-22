import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import NonAuthLayout from "../../../components/NonAuthLayout";
import * as actions from "../../../store/customer/actions";
import MainMenu from "./MainMenu";
import DrinkMenu from "./DrinkMenu";
import ExtraMenu from "./ExtraMenu";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import {getAllCategoryRequest} from "../../../store/customer/actions";
import {apiError} from "../../../store/auth/login/actions";

const CustomerMenu = (props) => {

    useEffect(() => {
        props.dispatch(actions.getAllCategoryRequest());
        props.dispatch(actions.getAllMenuRequest());
    }, []);

    console.log("combo : "+props?.dataMenu?.combo);

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
                    <div className="d-flex menu-bar">
                        {props?.dataCategory?.map((category) => (
                            <a className="menu-type-a" href={"#" + category?.name}>
                                <button className="menu-type">
                                    <div>{(category?.name === 'combo') ? ('Combo Nướng + Lẩu') :
                                        (category?.name === 'drink') ? ('Đồ uống') :
                                            (category?.name === 'fast') ? ('Đồ ăn kèm') : null}</div>
                                </button>
                            </a>
                        ))}
                        {props?.dataCategory?.map((category) => (
                            <a className="menu-type-a" href={"#" + category?.name}>
                                <button className="menu-type">
                                    <div>{(category?.name === 'combo') ? ('Combo Nướng + Lẩu') :
                                        (category?.name === 'drink') ? ('Đồ uống') :
                                            (category?.name === 'fast') ? ('Đồ ăn kèm') : null}</div>
                                </button>
                            </a>
                        ))}
                    </div>
                </div>

                <div id="combo">
                    <div className="title-menu"><b>Combo nướng + lẩu</b></div>
                    {props?.dataMenu?.combo?.map((combo) => (
                        <div className="item-menu d-flex">
                            <div align="left" className="col-10">
                                <div className="item-name"><b>{combo?.name}</b></div>
                                <div className="item-cost">{(combo?.cost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} vnd</div>
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link to="/customer-detail-combo">
                                    <button className="add-btn">
                                        <div>+</div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="drink">
                    <div className="title-menu"><b>Đồ uống</b></div>
                    {props?.dataMenu?.drink?.map((drink) => (
                        <div className="item-menu d-flex">
                            <div align="left" className="col-10">
                                <div className="item-name"><b>{drink?.name}</b></div>
                                <div className="item-cost">{(drink?.cost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} vnd</div>
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link to="/customer-detail-drink">
                                    <button className="add-btn">
                                        <div>+</div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="fast">
                    <div className="title-menu"><b>Đồ ăn kèm</b></div>
                    {props?.dataMenu?.fast?.map((fast) => (
                        <div className="item-menu d-flex">
                            <div align="left" className="col-10">
                                <div className="item-name"><b>{fast?.name}</b></div>
                                <div className="item-cost">{(fast?.cost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} vnd</div>
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link to="/customer-detail-drink">
                                    <button className="add-btn">
                                        <div>+</div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {/*<div id="drink"><DrinkMenu/></div>*/}
                {/*<div id="fast"><ExtraMenu/></div>*/}

                {/*<div className="cart">*/}
                {/*    <Link to="/customer-cart">*/}
                {/*        <button className="cart-button">*/}
                {/*            <div>Xem danh sách món đã chọn</div>*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
    };
};

export default withNamespaces()(connect(mapStateToProps)(CustomerMenu));