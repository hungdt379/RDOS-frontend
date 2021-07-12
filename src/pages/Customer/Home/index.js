import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
//Import scss
import "../../../assets/scss/custom/pages/customer/home.scss";
import "../../../assets/scss/custom/pages/customer/screen.scss";
import * as actions from "../../../store/customer/actions";
import CallWaiter from "../CallWaiter";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {postCallWaiterRequest} from "../../../store/customer/actions";
import firebase from "../../../helpers/firebase";
// import images
import profile from "../../../assets/images/customer/logo-web-after-design.jpg";
import ereader from "../../../assets/images/customer/ereader.png";
import playListCheck from "../../../assets/images/customer/play-list-check.png";
import desktop from "../../../assets/images/customer/desktop.png";
import bell from "../../../assets/images/customer/bell.png";
import awards from "../../../assets/images/customer/awards.png";

import {Col, Row} from "reactstrap";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const CustomerHome = (props) => {
    //const {tog_standard} = props;
    const dispatch = useDispatch();
    const [openCall, setOpenCall] = useState(false);

    const [notiPayment, setNotiPayment] = useState('Đã gửi yêu cầu thanh toán, hãy đợi giây lát!');
    const [notiWaiter, setNotiWaiter] = useState('Đã gửi yêu cầu đến phục vụ, hãy đợi giây lát!');
    const [notiSendOrder, setNotiSendOrder] = useState('Đã gửi yêu cầu đặt món, hãy đợi giây lát!');

    const handleSubmitCallWaiters = (data) => {
        dispatch(postCallWaiterRequest({data}));
        setOpenCall(false);
        alert("Đã gửi yêu cầu đến phục vụ bàn!");
    };

    const [todoListRe, setTodoListRe] = useState(0);
    const [todoDataRe, setTodoDataRe] = useState();

    const [todoListWa, setTodoListWa] = useState(0);
    const [todoDataWa, setTodoDataWa] = useState();

    useEffect(() => {
        const todoRef = firebase.database().ref('receptionist');
        todoRef.on('value', (snapshot) => {
            setTodoListRe(snapshot.numChildren());

            const todos = snapshot.val();
            const todoDataRe = [];
            for (let id in todos) {
                todoDataRe.push({id, ...todos[id]});
            }
            setTodoDataRe(todoDataRe);
        });

        const todoWa = firebase.database().ref('waiter/' + props.authCustomer.data.user.user_id);
        todoWa.on('value', (snapshot) => {
            setTodoListWa(snapshot.numChildren());

            const todosw = snapshot.val();
            const todoDataWa = [];
            for (let id in todosw) {
                todoDataWa.push({id, ...todosw[id]});
            }
            setTodoDataWa(todoDataWa);
        });
    }, []);

    console.log("notiFirebase notire true: " + todoDataRe);
    console.log("notiFirebase notiwa true: " + todoDataWa);
    console.log("auCus: " + props.authCustomer.data.token);

    return (
        <React.Fragment>
            <div className="display-customer">
                <div style={{marginBottom: '250px'}}>
                    <div className="v4_1">
                        <div align="center" className="header-home-table-code">
                            <div className="mb-3">
                            <span className="avatar-title bg-light span-table-code">
                                <div className="div-table-code">{props.authCustomer.data.user.user_name}</div>
                            </span>
                            </div>
                        </div>

                        <div className="bg-soft-primary">
                            <Row style={{backgroundColor: '#ffffff'}}>
                                <Col align='center' className="col-12 mt-3">
                                    <img src={profile} alt="" className="img-fluid"/>
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: '#ffffff'}}>
                                <Col align='center' className="col-12">
                                    <div className="p-4">
                                        <div className='welcome-text'><b>Xin chào Quý khách !</b></div>
                                        <p className='welcome-do'>Rất hân hạnh được phục vụ Quý khách</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div align='center' className='pt-2 pb-5'>
                            <Link to="/customer-menu">
                                <button className="menu-button">
                                    <div align='center' className="text-button">
                                        <img src={ereader} className="icon-button mr-2 mb-1"/>
                                        Xem Menu - Gọi món
                                    </div>
                                </button>
                            </Link>
                        </div>

                        <div className="d-flex three-button pt-2 pb-2">
                            <Link align="center" className="square-button">
                                <a onClick={() => {
                                    if ((todoDataRe.filter((tr, index) => (tr.user_id === props.authCustomer.data.user.user_id)).length === 0) &&
                                        (todoDataWa.filter((tw, index) => (tw.title === "Gọi thanh toán")).length === 0)) {
                                        props.dispatch(actions.postCallPaymentRequest());
                                        alert("Đã gửi yêu cầu thanh toán đến nhà hàng!");
                                    } else {
                                        alert("Bạn đã gửi đi yêu cầu trước đó, vui lòng đợi trong giây lát!");
                                    }
                                }}
                                   style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img src={desktop} className="icon-button"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button">Gọi thanh toán</div>
                                </a>
                            </Link>
                            <Link align="center" className="square-button">
                                <a
                                    onClick={() => {
                                        if (todoDataWa.filter((tw, index) => (tw.title === "Gọi phục vụ")).length === 0) {
                                            setOpenCall(true)
                                        } else {
                                            alert("Bạn đã gửi đi yêu cầu trước đó, vui lòng đợi trong giây lát!");
                                        }
                                    }}
                                    style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img src={bell} className="icon-button"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button">Gọi phục vụ</div>
                                </a>
                            </Link>
                            <Link align="center" className="square-button" to="/customer-feedback">
                                <a style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img src={awards} className="icon-button"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button">Đánh giá</div>
                                </a>
                            </Link>
                        </div>

                        <div align='center' className='pt-3'>
                            <button onClick={() => {
                                props.history.push('/customer-see-order')
                            }} className='menu-button-disable' disabled={false}>
                                <div align='center' className="text-button">
                                    <img style={{
                                        width: '25px',
                                        height: '20px'
                                    }} src={playListCheck} className="icon-button mr-2 mb-1"/>
                                    Xem Order
                                </div>
                            </button>
                        </div>
                    </div>
                    <div style={{backgroundColor: '#6a7187', bottom: '60px'}}>
                        <CallWaiter
                            open={openCall}
                            onClose={() => setOpenCall(false)}
                            handleSubmitCallWaiter={handleSubmitCallWaiters}
                        />
                    </div>
                    {todoDataRe ? ((todoDataRe.filter((tr, index) => (tr.user_id === props.authCustomer.data.user.user_id)).length !== 0) ?
                            (<div align="center"><i style={{color: "lightcoral", fontSize: '20px'}}
                                                    className="bx bx-calendar-check bx-tada"></i><b
                                style={{color: 'lightcoral', fontSize: '15px', fontFamily:'Cabin'}}>{notiPayment}</b></div>) : (<div></div>)
                        )
                        : ''}
                    {todoDataWa
                        ? ((todoDataWa.filter((tw, index) => (tw.title === "Gọi phục vụ")).length !== 0) ?
                                (<div align="center"><i style={{color: "green", fontSize: '20px'}}
                                                        className="bx bx-calendar-check bx-tada"></i><b
                                    style={{color: 'green', fontSize: '15px', fontFamily:'Cabin'}}>{notiWaiter}</b></div>) : (<div></div>)
                        )
                        : ''}
                    {todoDataWa
                        ? ((todoDataWa.filter((tw, index) => (tw.title === "Đặt món")).length !== 0) ?
                                (<div align="center"><i style={{color: "blue", fontSize: '20px'}}
                                                        className="bx bx-calendar-check bx-tada"></i><b
                                    style={{color: 'blue', fontSize: '15px', fontFamily:'Cabin'}}>{notiSendOrder}</b></div>) : (<div></div>)
                        )
                        : ''}
                </div>
                <Footer/>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
};

const mapStatetoProps = (state) => {
    const {error, success} = state.Profile;
    const {authCustomer} = state.LoginCustomer;
    return {error, success, authCustomer};
};
export default withRouter(
    connect(mapStatetoProps)((CustomerHome))
);