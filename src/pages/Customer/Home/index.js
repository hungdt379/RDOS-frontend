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
import {postCallWaiterRequest} from "../../../store/customer/actions";
import firebase from "../../../helpers/firebase";
// import images
import profile from "../../../assets/images/customer/logo-after-design.png";
import ereader from "../../../assets/images/customer/ereader.png";
import playListCheck from "../../../assets/images/customer/play-list-check.png";
import desktop from "../../../assets/images/customer/desktop.png";
import bell from "../../../assets/images/customer/bell.png";
import awards from "../../../assets/images/customer/awards.png";

import {Col, Modal, Row} from "reactstrap";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import useSound from "use-sound";
import payAudio from "../../../assets/audio/ka-ching.mp3";

const CustomerHome = (props) => {
    //const {tog_standard} = props;
    const dispatch = useDispatch();
    const [openCall, setOpenCall] = useState(false);

    const [notiPayment, setNotiPayment] = useState('Đã gửi yêu cầu thanh toán, hãy đợi giây lát!');
    const [notiWaiter, setNotiWaiter] = useState('Đã gửi yêu cầu đến phục vụ, hãy đợi giây lát!');
    const [notiSendOrder, setNotiSendOrder] = useState('Đã gửi yêu cầu đặt món, hãy đợi giây lát!');

    const [openLoadPa, setOpenLoadPa] = useState(false);
    const [openLoadNoOrder, setOpenLoadNoOrder] = useState(false);
    const [openLoadCa, setOpenLoadCa] = useState(false);

    const [openLoadCheck, setOpenLoadCheck] = useState(false);

    const handleSubmitCallWaiters = (data) => {
        dispatch(postCallWaiterRequest({data}));
        setOpenCall(false);
        setOpenLoadCa(true);
        setTimeout(() => {
            setOpenLoadCa(false);
        }, 2800)
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

        props.dispatch(actions.getViewOrderRequest(props.authCustomer.data.user.user_id));
    }, []);

    console.log("notiFirebase notire true: " + todoDataRe);
    console.log("notiFirebase notiwa true: " + todoDataWa);
    console.log("auCus: " + props.authCustomer.data.token);

    console.log("checkView Order: " + props?.allViewOrder?.data);

    const [payOn] = useSound(
        payAudio,
        { volume: 0.75 }
    );

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
                                    <img style={{width:'138px', height: '120px'}} src={profile} alt="" className="img-fluid"/>
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
                                        <img style={{width: '24px', height: '18px'}} src={ereader} className="icon-button mr-2 mb-1"/>
                                        Xem Menu - Gọi món
                                    </div>
                                </button>
                            </Link>
                        </div>

                        <div className="d-flex three-button pt-2 pb-2">
                            <Link align="center" className="square-button">
                                <a onClick={() => {
                                    if (props?.allViewOrder?.data !== undefined && props?.allViewOrder?.data?.item?.length !== 0){
                                        if ((todoDataRe.filter((tr, index) => (tr.user_id === props.authCustomer.data.user.user_id)).length === 0) &&
                                            (todoDataWa.filter((tw, index) => (tw.title === "Gọi thanh toán")).length === 0)) {
                                            props.dispatch(actions.postCallPaymentRequest());
                                            setOpenLoadPa(true);
                                            payOn()
                                            setTimeout(() => {
                                                setOpenLoadPa(false);
                                            }, 1000)
                                        } else {
                                            setOpenLoadCheck(true);
                                            setTimeout(() => {
                                                setOpenLoadCheck(false);
                                            }, 2800)
                                        }
                                    }else{
                                        setOpenLoadNoOrder(true);
                                        setTimeout(() => {
                                            setOpenLoadNoOrder(false);
                                        }, 2800)
                                    }
                                }}
                                   style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img style={{width: '23px', height: '18px'}} src={desktop} className="icon-button"/>
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
                                            setOpenLoadCheck(true);
                                            setTimeout(() => {
                                                setOpenLoadCheck(false);
                                            }, 2800)
                                        }
                                    }}
                                    style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img style={{width: '16px', height: '23px'}} src={bell} className="icon-button"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button">Gọi phục vụ</div>
                                </a>
                            </Link>
                            <Link align="center" className="square-button" to="/customer-feedback">
                                <a style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                    <div style={{marginRight : 'auto', marginLeft: 'auto'}} className="avatar-sm profile-user-wid mb-2">
                                        <div align="center" style={{backgroundColor:'#FFEFCD'}} className="avatar-title rounded-circle">
                                            <img style={{width: '16px', height: '23px'}} src={awards} className="icon-button"/>
                                        </div>
                                    </div>
                                    <div className="square-text-button">Đánh giá</div>
                                </a>
                            </Link>
                        </div>

                        <div align='center' className='pt-3'>
                            <button onClick={() => {
                                props.history.push('/customer-see-order')
                            }} className={(props?.allViewOrder?.data !== undefined && props?.allViewOrder?.data?.item?.length !== 0)?'menu-button-disable-none':'menu-button-disable'}
                                    disabled={(props?.allViewOrder?.data !== undefined && props?.allViewOrder?.data?.item?.length !== 0)? false : true}>
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
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadPa}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Đã gửi yêu cầu thanh toán !</b>
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
                }} isOpen={openLoadNoOrder}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "red", fontSize: '50px'}}
                           className="bx bx-calendar-exclamation bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Bạn chưa thể thanh toán khi không có Order nào !</b>
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
                        }}><b>Bạn đã gửi đi yêu cầu trước đó, vui lòng đợi trong giây lát !</b>
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
                }} isOpen={openLoadCa}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Đã gửi yêu cầu đến phục vụ !</b>
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

const mapStatetoProps = (state) => {
    const {error, success} = state.Profile;
    const {authCustomer} = state.LoginCustomer;
    return {error, success, authCustomer,
        allViewOrder: state.Customer.getViewOrder.allViewOrder
    };
};
export default withRouter(
    connect(mapStatetoProps)((CustomerHome))
);