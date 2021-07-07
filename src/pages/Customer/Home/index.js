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
import NotificationCardFooter from "../../Receptionist/NotificationCardFooter";

const CustomerHome = (props) => {
    //const {tog_standard} = props;
    const dispatch = useDispatch();
    const [openCall, setOpenCall] = useState(false);

    const [notiPayment, setNotiPayment] = useState('Đã gửi yêu cầu thanh toán, hãy đợi giây lát!');
    const [notiWaiter, setNotiWaiter] = useState('Đã gửi yêu cầu đến phục vụ, hãy đợi giây lát!');

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
                <div className="v4_1">
                    <div className="d-flex header-home">
                        <div align="left" className="system col-6">RDOS</div>
                        <div align="right" className="table-code col-6">{props.authCustomer.data.user.user_name}</div>
                    </div>

                    <div align='center' className="info">
                        <div className="v56_0">XIN CHÀO QUÝ KHÁCH</div>
                        <div className="v56_1">Rất hân hạnh được phục vụ Quý Khách</div>
                    </div>

                    <Link to="/customer-menu">
                        <button className="menu-button d-flex">
                            <div align="left" className="icon col-4">(icon)</div>
                            <div align="right" className="text-button col-8">Xem Menu - Gọi món</div>
                        </button>
                    </Link>

                    <div className="d-flex">
                        <Link align="center" className="square-button">
                            <button onClick={() => {
                                if ((todoDataRe.filter((tr, index) => (tr.user_id === props.authCustomer.data.user.user_id)).length === 0) &&
                                    (todoDataWa.filter((tw, index) => (tw.title === "Gọi thanh toán")).length === 0))
                                {
                                    props.dispatch(actions.postCallPaymentRequest());
                                    alert("Đã gửi yêu cầu thanh toán đến nhà hàng!");
                                }else{
                                    alert("Bạn đã gửi đi yêu cầu trước đó, vui lòng đợi trong giây lát!");
                                }
                            }}
                                    style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Gọi thanh toán</div>
                            </button>
                        </Link>
                        <Link align="center" className="square-button">
                            <button
                                onClick={() => {
                                    if (todoDataWa.filter((tw, index) => (tw.title === "Gọi phục vụ")).length === 0) {
                                        setOpenCall(true)
                                    } else {
                                        alert("Bạn đã gửi đi yêu cầu trước đó, vui lòng đợi trong giây lát!");
                                    }
                                }}
                                style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Gọi phục vụ</div>
                            </button>
                        </Link>
                        <Link align="center" className="square-button" to="/customer-feedback">
                            <button style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Đánh giá</div>
                            </button>
                        </Link>
                    </div>

                    <Link to="/customer-see-order">
                        <button className="menu-button d-flex">
                            <div align="left" className="icon col-4">(icon)</div>
                            <div align="right" className="text-button col-8">Xem Order</div>
                        </button>
                    </Link>


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
                            style={{color: 'lightcoral', fontSize: '15px'}}>{notiPayment}</b></div>) : (<div></div>)
                    )
                    : ''}
                {todoDataWa
                    ? ((todoDataWa.filter((tw, index) => (tw.title === "Gọi phục vụ")).length !== 0) ?
                            (<div align="center"><i style={{color: "green", fontSize: '20px'}}
                                                    className="bx bx-calendar-check bx-tada"></i><b
                                style={{color: 'green', fontSize: '15px'}}>{notiWaiter}</b></div>) : (<div></div>)
                    )
                    : ''}
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