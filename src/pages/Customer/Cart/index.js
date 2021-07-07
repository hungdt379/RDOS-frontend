import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import * as actions from "../../../store/customer/actions";

const Cart = (props) => {

    useEffect(() => {
        props.dispatch(actions.getCartRequest());
    }, []);

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
                    <div className="title-menu"><b>Số người: {props.authCustomer.data.user.number_of_customer}</b></div>
                    {props?.dataCart?.data?.item_in_cart?.map((iic, index) => (
                        <Link>
                            <div className="item-menu d-flex">
                                <div align="left" className="col-8">
                                    <div className="item-name"><b>{iic?.name}</b></div>
                                    <div className="item-cost"> {(iic?.total_cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd</div>
                                </div>
                                <div align="center" className="add-button col-2">
                                    x{iic.quantity}
                                </div>
                                <div align="right" className="add-button col-2">
                                    <Link>
                                        <div>xóa</div>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="d-flex order-drink">
                    <div style={{paddingTop: '10px'}} align="left" className="col-6">
                        <b style={{color: '#000000'}}>Tổng tiền: {props?.dataCart?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd</b>
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

const mapStateToProps = (state) => {
    const {authCustomer} = state.LoginCustomer;
    return {
        authCustomer,
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataCart: state.Customer.getCart.dataCart,
    };
};

export default withNamespaces()(connect(mapStateToProps)(Cart));