import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import * as actions from "../../../store/customer/actions";
import {authHeaderCus, authHeaderGetApiCus} from "../../../helpers/jwt-token-access/auth-token-header";

const Cart = (props) => {

    useEffect(() => {
        props.dispatch(actions.getCartRequest());
    }, []);

    const backPage = () => {
        props.history.push("/customer-menu");
        props.dispatch(actions.getFoodInComboRequest());
    }

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-detail d-flex">
                    <div align="left" className="col-sm-3 col-md-2">
                        <button
                            onClick={backPage}
                            style={{height: '33px'}}>
                            <div>
                                <b>Back</b>
                            </div>
                        </button>
                    </div>
                    <div style={{paddingTop: '8px'}} align="center" className="col-sm-6 col-md-8">
                        <b>Món đã chọn</b>
                    </div>
                    <div align="right" className="col-sm-3 col-md-2">
                        <button onClick={() => {
                            props.dispatch(actions.deleteAllFromCartRequest())
                            setTimeout(() => {
                                props.history.push('/customer-menu')
                                props.dispatch(actions.getFoodInComboRequest())
                            }, 1000)
                        }}
                                style={{height: '33px'}}>
                            <div>
                                <b>Xóa hết</b>
                            </div>
                        </button>
                    </div>
                </div>

                <div>
                    <div className="title-menu d-flex">
                        <div className="col-12" align="left">
                            <b>Số người: {props.authCustomer.data.user.number_of_customer}</b>
                        </div>
                    </div>
                    {props?.dataCart?.data?.item_in_cart?.map((iic, index) => (
                        <Link key={index}>
                            <div className="item-menu d-flex">
                                <div align="left" className="col-8">
                                    <div className="item-name"><b>{iic?.name}</b></div>
                                    <div
                                        className="item-cost"> {(iic?.total_cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                    </div>
                                </div>
                                <div align="center" className="add-button col-2">
                                    x{iic.quantity}
                                </div>

                                <div align="right" className="add-button col-2">
                                    <a onClick={() => {
                                        fetch('http://165.227.99.160/api/customer/cart/item/delete?item_id[]=' + iic?._id, {
                                            method: 'POST',
                                            headers: authHeaderGetApiCus(),
                                        })
                                            .then(res => {
                                                if (res.ok) {
                                                    console.log('DELETE SUCCESS')
                                                } else {
                                                    console.log('DELETE FAILED')
                                                }
                                            })
                                            .then(data => console.log(data))
                                            .catch(error => console.log('ERROR'))
                                        setTimeout(() => {
                                            props.dispatch(actions.getCartRequest())
                                        }, 500)
                                    }}>
                                        <i style={{color: "red", fontSize: '20px'}} className="bx bx-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="d-flex order-drink">
                    <div style={{paddingTop: '10px'}} align="left" className="col-6">
                        <b style={{color: '#000000'}}>Tổng
                            tiền: {props?.dataCart?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd</b>
                    </div>
                    <div align="right" className="col-6">
                        {props?.dataCart?.data?.item_in_cart.length > 0 ? (
                            <button
                                onClick={() => {
                                    props.dispatch(actions.sendOrderRequest())
                                    alert("Bạn đã đặt món thành công vui lòng chờ nhà bếp ra món!")
                                    props.history.push('/customer-see-order')
                                }}
                                className="order-button-drink">
                                <div>Gửi yêu câu đặt món</div>
                            </button>
                        ) : (null)}
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
        dataDeleteFromCart: state.Customer.deleteFromCart.dataDeleteFromCart,
        dataDeleteAllFromCart: state.Customer.deleteAllFromCart.dataDeleteAllFromCart,
        dataSendOrder: state.Customer.sendOrder.dataSendOrder,
    };
};

export default withNamespaces()(connect(mapStateToProps)(Cart));