import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";
import left from "../../../assets/images/customer/chevron-left-o.png";
import * as actions from "../../../store/customer/actions";
import trash from "../../../assets/images/customer/trash.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import {authHeaderGetApiCus} from "../../../helpers/jwt-token-access/auth-token-header";
import close from "../../../assets/images/customer/close.png";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const SeeOrder = props => {

    useEffect(() => {
        props.dispatch(actions.getCartRequest());
        props.dispatch(actions.getViewOrderRequest(props.authCustomer.data.user.user_id));
    }, []);

    console.log("view order test: " + props?.allViewOrder?.data);

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div className="d-flex">
                        <div className="home-icon col-2">
                            <Link to="/customer-home">
                                <img src={left} className="icon-button"/>
                            </Link>
                        </div>
                        <div align="center" className="menu-search col-8">
                            <div className="mt-2 mb-2">
                                <span className="avatar-title bg-light span-table">
                                    <div className="div-table">Món đã order</div>
                                </span>
                            </div>
                        </div>
                        <div align="right" className="home-icon col-2">
                        </div>
                    </div>

                    <div>
                        <div align="center" style={{
                            height: '60px',
                            backgroundColor: '#F8F8FB',
                            paddingTop: '35px',
                            paddingBottom: '50px',
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}>
                            <b style={{
                                fontStyle: 'normal',
                                fontSize: '23px',
                                fontFamily: 'Calibri',
                                lineHeight: '25px',
                            }}>Số người: {props.authCustomer.data.user.number_of_customer}</b>
                        </div>
                        <div style={{marginTop: '20px'}} className="cover-list">
                            <div className="side-list-menu">
                                <PerfectScrollbar className="list-menu">
                                    {props?.dataCart?.data?.item_in_cart?.map((iic, index) => (
                                        <Link key={index}>
                                            <div style={{width:'96%'}} className="item-menu d-flex">
                                                <div className="col-12 d-flex menu-item-bar">
                                                    <div align="left" className="col-12 d-flex">
                                                        <div className="col-10">
                                                            <div className="item-name"><b>{iic?.name}</b></div>
                                                            <div
                                                                className="item-cost ">{(iic?.total_cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                            </div>
                                                        </div>
                                                        <div align='right' className="col-2" style={{
                                                            fontFamily: 'Calibri',
                                                            fontStyle: 'normal',
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                            lineHeight: '17px',
                                                            textAlign: 'right',
                                                            color: '#1E1C19',
                                                            marginTop:'auto',
                                                            marginBottom:'auto'
                                                        }}>{iic.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </PerfectScrollbar>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
};
const mapStateToProps = (state) => {
    const {authCustomer} = state.LoginCustomer;
    return {
        authCustomer,
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataCart: state.Customer.getCart.dataCart,
        dataDeleteFromCart: state.Customer.deleteFromCart.dataDeleteFromCart,
        dataDeleteAllFromCart: state.Customer.deleteAllFromCart.dataDeleteAllFromCart,
        dataSendOrder: state.Customer.sendOrder.dataSendOrder,
        allViewOrder: state.Customer.getViewOrder.allViewOrder
    };
};

export default withNamespaces()(connect(mapStateToProps)(SeeOrder));