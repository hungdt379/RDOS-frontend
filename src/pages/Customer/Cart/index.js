import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import * as actions from "../../../store/customer/actions";
import {authHeaderCus, authHeaderGetApiCus} from "../../../helpers/jwt-token-access/auth-token-header";
import left from "../../../assets/images/customer/chevron-left-o.png";
import trash from "../../../assets/images/customer/trash.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import close from "../../../assets/images/customer/close.png";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {Modal} from "reactstrap";
import useSound from 'use-sound';
import wrongAudio from '../../../assets/audio/incorrect.swf.mp3';
import dingAudio from '../../../assets/audio/ding-sound-effect_2.mp3';

const Cart = (props) => {

    const [openLoadDe, setOpenLoadDe] = useState(false);
    const [openSendOrder, setOpenSendOrder] = useState(false);
    const [openLoadCheck, setOpenLoadCheck] = useState(false);

    useEffect(() => {
        props.dispatch(actions.getCartRequest());
    }, []);

    const backPage = () => {
        props.history.push("/customer-menu");
        props.dispatch(actions.getFoodInComboRequest());
    }

    console.log("test :" + props?.dataSendOrder)

    const [successOn] = useSound(
        dingAudio,
        { volume: 1 }
    );

    const [wrongOn] = useSound(
        wrongAudio,
        { volume: 1 }
    );

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div className="d-flex">
                        <div className="home-icon col-2">
                            <a onClick={backPage}>
                                <img style={{width: '22px', height: '22px'}} src={left} className="icon-button"/>
                            </a>
                        </div>
                        <div align="center" className="menu-search col-8">
                            <div className="mt-2 mb-2">
                                <span className="avatar-title bg-light span-table">
                                    <div className="div-table">M??n ???? ch???n</div>
                                </span>
                            </div>
                        </div>
                        <div align="right" className="home-icon col-2">
                            <a onClick={() => {
                                props.dispatch(actions.deleteAllFromCartRequest())
                                setOpenLoadDe(true);
                                setTimeout(() => {
                                    props.history.push('/customer-menu')
                                    props.dispatch(actions.getFoodInComboRequest())
                                    setOpenLoadDe(false)
                                }, 1000)
                            }}>
                                <img style={{width: '19px', height: '21px'}} src={trash} className="icon-button"/>
                            </a>
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
                                fontSize: '18px',
                                fontFamily: 'Cabin',
                                lineHeight: '25px',
                            }}>S??? ng?????i: {props.authCustomer.data.user.number_of_customer}</b>
                        </div>
                        <div style={{marginTop: '20px'}} className="cover-list">
                            <div className="side-list-menu">
                                <PerfectScrollbar className="list-menu">
                                    {props?.dataCart?.data?.item_in_cart?.map((iic, index) => (
                                        <div className="item-menu d-flex">
                                            <div className="col-11 d-flex menu-item-bar">
                                                <Link style={{width: '100%'}} to={`/customer-detail-combo/${iic?._id}`}>
                                                    <div align="left" className="col-11 d-flex">
                                                        <div align="left" className="col-3" style={{marginLeft: '-12px'}}>
                                                            <img src={iic?.image} alt="" height='80px' width='80px'/>
                                                        </div>
                                                        <div className="col-7">
                                                            <div className="item-name"><b>{iic?.name}</b></div>
                                                            <div
                                                                className="item-cost ">{(iic?.total_cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                            </div>
                                                        </div>
                                                        <div align='right' className="col-1" style={{
                                                            fontFamily: 'Cabin',
                                                            fontStyle: 'normal',
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                            lineHeight: '17px',
                                                            textAlign: 'right',
                                                            color: '#1E1C19',
                                                            paddingTop: '25px'
                                                        }}>{iic.quantity}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="add-button col-1">
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
                                                    setOpenLoadDe(true);
                                                    setTimeout(() => {
                                                        props.dispatch(actions.getCartRequest())
                                                    }, 600)
                                                    setTimeout(() => {
                                                        setOpenLoadDe(false);
                                                    }, 1800)
                                                }}>
                                                    <div style={{
                                                        marginRight: 'auto',
                                                        marginLeft: 'auto'
                                                    }}
                                                         className="avatar-xs">
                                                        <div
                                                            className="plus-background-color avatar-title rounded-circle mt-2"
                                                            style={{backgroundColor: 'red'}}>
                                                            <img src={close} className="plus-icon-button"/>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                    {props?.dataCart?.data?.item_in_cart?.length > 0 ? (null) : (
                                        <div align='center'>
                                            <b
                                                style={{
                                                    fontFamily: 'Cabin',
                                                    fontSize: '16px',
                                                }}
                                            >B???n ch??a ch???n m??n n??o</b>
                                            <div
                                                style={{
                                                    fontFamily: 'Cabin',
                                                    fontSize: '14px',
                                                }}
                                            >H??y ch???n m??n b???n th??ch nh??
                                            </div>
                                            <div align='center' onClick={() => {
                                                backPage()
                                            }}
                                                 style={{
                                                     backgroundColor: '#FCBC3A',
                                                     border: '1px solid #FCBC3A',
                                                     borderRadius: '10px',
                                                     height: '30px',
                                                     fontFamily: 'Cabin',
                                                     fontSize: '16px',
                                                     width: '60%'
                                                 }}
                                            >
                                                <b>Quay v??? menu</b>
                                            </div>
                                        </div>
                                    )}
                                </PerfectScrollbar>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cart">
                    {props?.dataCart?.data?.item_in_cart.length > 0 ? (
                        <button className="cart-button d-flex"
                                style={{
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                }}
                                onClick={() => {
                                    fetch('http://165.227.99.160/api/customer/order/send', {
                                        method: 'POST',
                                        headers: authHeaderGetApiCus(),
                                    })
                                        .then(res => {
                                            if (res.status === 200) {
                                                setOpenSendOrder(true);
                                                successOn()
                                                setTimeout(() => {
                                                    setOpenSendOrder(false);
                                                    props.history.push('/customer-menu')
                                                }, 2000)
                                                console.log(res)
                                            } else {
                                                setOpenLoadCheck(true);
                                                wrongOn()
                                                setTimeout(() => {
                                                    setOpenLoadCheck(false);
                                                }, 2000)
                                                console.log(res)
                                            }
                                        })
                                        .then(data => console.log(data))
                                        .catch(error => console.log('ERROR'))
                                }}>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: '16px',
                                lineHeight: '17px',
                                color: '#1E1C19',
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }} align="left" className="col-6">
                                <b style={{color: '#000000'}}>{props?.dataCart?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd</b>
                            </div>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: '16px',
                                lineHeight: '17px',
                                color: '#1E1C19',
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }} align="right" className="col-6">
                                G???i y??u c???u ?????t m??n
                            </div>
                        </button>
                    ) : (<Footer/>)}
                </div>
                <Modal align="center" style={{
                    width: '150px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadDe}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-loader bx-spin"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>??ang x??a!!!</b>
                        </div>
                    </div>
                </Modal>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openSendOrder}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>?????t m??n th??nh c??ng !</b>
                        </div>
                    </div>
                </Modal>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadCheck}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "red", fontSize: '50px'}}
                           className="bx bx-calendar-exclamation bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Ph???c v??? ??ang x??? order tr?????c ???? !</b>
                        </div>
                    </div>
                </Modal>
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
        allQueueOrder: state.Customer.getCheckQueueOrder.allQueueOrder,
    };
};

export default withNamespaces()(connect(mapStateToProps)(Cart))