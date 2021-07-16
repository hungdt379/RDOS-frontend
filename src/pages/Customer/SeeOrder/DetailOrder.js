import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link, useParams} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import shoppingCart from "../../../assets/images/customer/shopping-cart.png";
import mathMinus from "../../../assets/images/customer/math-minus.png";
import mathPlus from "../../../assets/images/customer/math-plus.png";
import {connect, useDispatch} from "react-redux";
import * as actions from "../../../store/customer/actions";
import {withNamespaces} from "react-i18next";
import left from "../../../assets/images/customer/chevron-left-o.png";
import {getFoodInComboRequest} from "../../../store/customer/actions";

const DetailItemOrder = (props) => {

    const dispatch = useDispatch();
    const {_id} = useParams();

    console.log("itemOrderId: " + _id);

    useEffect(() => {
        props.dispatch(actions.getViewOrderRequest(props.authCustomer.data.user.user_id));
    }, []);

    const backPage = () => {
        props.history.goBack();
    }

    return (
        <React.Fragment>
            <div className="header-menu">
                <div className="d-flex">
                    <div className="home-icon col-2">
                        <a onClick={backPage}>
                            <img src={left} className="icon-button"/>
                        </a>
                    </div>
                    <div align="center" className="menu-search col-8">
                        <div className="mt-2 mb-2">
                                <span style={{width: '150px'}} className="avatar-title bg-light span-table">
                                    <div className="div-table">
                                        {props?.allViewOrder?.data?.item?.map((d, i) => (d._id === _id) ? (d.detail_item.name) : null)}
                                    </div>
                                </span>
                        </div>
                    </div>
                    <div align="right" className="home-icon col-2">
                    </div>
                </div>
            </div>

            {props?.allViewOrder?.data?.item?.filter((adol) => (adol._id === _id)).map((dol,i) => (dol.dish_in_combo !== null) ? (
                <div>
                    <div align="center" className="image-item">
                        <img src={dol?.detail_item?.image} alt="" height="300px" width="300px"/>
                    </div>

                    <div align="center" style={{
                        height: '90px',
                        backgroundColor: '#F8F8FB',
                        paddingTop: '20px',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}>
                        <b style={{
                            fontStyle: 'normal',
                            fontSize: '23px',
                            fontFamily: 'Cabin',
                            lineHeight: '25px',
                        }}>{(dol?.detail_item?.name)}</b>
                        <div
                            className="cost-item">{(dol?.detail_item?.cost)} vnd
                        </div>
                    </div>
                    <div className="cover-list">
                        <div className="side-list-menu">
                            <div className="list-menu">
                                <div className="list-item">
                                    <div className="d-flex">
                                        <div align="left" className="checkbox-dish">
                                            {dol?.dish_in_combo?.map((dic, index) => (
                                                <div style={{
                                                    fontFamily: 'Cabin',
                                                    fontSize: '15px',
                                                    fontWeight: 'normal',
                                                    fontStyle: 'normal',
                                                }}>{dic}</div>
                                            ))}
                                        </div>
                                        <div className="note-item" style={{width: '50%', marginTop: '0px'}}>
                                            <div style={{fontFamily: 'Cabin', fontSize: '15px'}}><b>Chú
                                                thích:</b>
                                                <div style={{
                                                    fontSize: '15px',
                                                    fontWeight: 'normal',
                                                    fontStyle: 'normal',
                                                    fontFamily: 'Cabin',
                                                }}>
                                                    {dol?.note}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div align="center" className="image-item">
                        <img src={dol?.detail_item?.image} alt="" height="300px" width="300px"/>
                    </div>

                    <div align="center" style={{
                        height: '90px',
                        backgroundColor: '#F8F8FB',
                        paddingTop: '20px',
                        paddingBottom: '50px',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}>
                        <b style={{
                            fontStyle: 'normal',
                            fontSize: '23px',
                            fontFamily: 'Cabin',
                            lineHeight: '25px',
                        }}>{(dol?.detail_item?.name)}</b>
                        <div
                            className="cost-item">{(dol?.detail_item?.cost)} vnd
                        </div>
                    </div>
                    <div style={{position: 'absolute'}} className="header-menu">
                        <div className="d-flex">
                            <div className="home-icon col-2">
                            </div>
                            <div align="center" className="menu-search col-8">
                                <div style={{marginTop: '-20px'}}>
                                        <span style={{
                                            height: '50px',
                                            width: '120px',
                                            backgroundColor: '#FFEFCD',
                                            border: '1px solid #FCBC3A'
                                        }} className="avatar-title span-table">
                                            <div style={{
                                                backgroundColor: '#FFEFCD',
                                                borderRadius: '30px',
                                                width: '110px'
                                            }} className='d-flex'>
                                                <div align="center" className="col-4">
                                                </div>
                                                <div align="center" className="col-4"
                                                     style={{fontSize: '16px', color: '#000000'}}>{dol.quantity}</div>
                                                <div align="center" className="col-4">
                                                </div>
                                            </div>
                                        </span>
                                </div>
                            </div>
                            <div align="right" className="home-icon col-2">
                            </div>
                        </div>
                    </div>
                    <div align='center' className="note-item" style={{width: '100%'}}>
                        <div style={{fontFamily: 'Cabin', fontSize: '15px'}}><b>Chú
                            thích:</b>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                fontFamily: 'Cabin',
                            }}>
                                {dol?.note}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const {authCustomer} = state.LoginCustomer;
    return {
        authCustomer,
        allViewOrder: state.Customer.getViewOrder.allViewOrder
    };
};

export default withNamespaces()(connect(mapStateToProps)(DetailItemOrder));