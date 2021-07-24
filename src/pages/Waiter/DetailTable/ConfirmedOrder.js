import React, {useState, Component, useEffect} from "react";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import "../../../assets/scss/custom/pages/waiter/Confirmed.scss";
import {Link, useLocation, withRouter} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import bell from  "../../../assets/images/customer/bell.png";
import confirmed from  "../../../assets/images/receptionist/carousel.png";
import a from  "../../../assets/images/waiter/sand-clock.png";
import b from  "../../../assets/images/waiter/arrows-exchange.png";
import Header from "../home/myHeader";
import {connect} from "react-redux";
import {
    getConfirmedOrderRequest,
    getQueueOrderRequest,
    postCancelQueueOrderRequest, postCloseTableRequest,
    postConfirmQueueOrderRequest, postCustomizeNumberRequest, postDeleteItemRequest
} from "../../../store/post/actions";
import {getTableRequest, postUpdateTableRequest} from "../../../store/notifications/actions";
import {apiError} from "../../../store/auth/login/actions";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const ConfirmedOrder = (props) => {

    const [role, setrole] = useState([]);

    const location  = useLocation();

    const value = {
        table_id: location.state._id
    }

    const {dataConfirmedOrder} = props;

    const customizeNumber = (item) =>{
        const aItem = {
            _id: dataConfirmedOrder._id,
            item_id: item.item_id,
            status: 1
        }
        console.log("dd");
        props.postCustomizeNumberRequest(aItem);
        props.getConfirmedOrderRequest(value);
    }

    function deleteItem(id){
        const value = {
            table_id: location.state._id,
            item_id: id
        }
        props.postDeleteItemRequest(value);
        props.getConfirmedOrderRequest(value);
    }

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.getConfirmedOrderRequest(value);
    }, []);

    console.log('role :' + role);

    return(
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w')?(
                    <div className="container_checkList">
                        <Header username={location.state.username} />
                        <div className="nav-confirmed">
                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to= {{ pathname:'/waiter-detail-table-notification',
                                        state:{
                                            _id: location.state._id,
                                            username:location.state.username
                                        }
                                    }}><img style={{width: '16px', height: '23px'}} src={bell}/>
                                    </Link>
                                </div>
                                <p>Thông báo</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to= {{ pathname:'/waiter-detail-table-confirm-order',
                                        state:{
                                            _id: location.state._id,
                                            username:location.state.username
                                        }
                                    }}>
                                        <img style={{width: '11px', height:'20px'}} src={a}/>
                                    </Link>
                                </div>
                                <p>Confirm Order</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to= {{ pathname:'/waiter-detail-table-change-table',
                                        state:{
                                            _id: location.state._id,
                                            username:location.state.username
                                        }
                                    }}>
                                        <img style={{width: '19px', height:'13px'}} src={b}/>
                                    </Link>
                                </div>
                                <p>Đổi Bàn</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to= {{ pathname:'/waiter-detail-table-confirmed-order',
                                        state:{
                                            _id: location.state._id,
                                            username:location.state.username
                                        }
                                    }}>
                                        <img src={confirmed}/>
                                    </Link>
                                </div>
                                <p>Confirmed Order</p>
                            </div>
                        </div>
                        <div style={{textAlign: "center", justifycontent: "center"}}>
                            <div className="list-Item">
                                {dataConfirmedOrder.item?.map((d, index) => (
                                        <div className="item-form-checkList" key={index}>
                                            <span>{d.detail_item.name}</span>
                                            <div className="save-button">
                                                <span>-</span>
                                                <span>{d.quantity}</span>
                                                <span onClick={() => {
                                                    customizeNumber(d)
                                                }}>+</span>
                                            </div>
                                            <span className="contain_button" onClick={() => {
                                                deleteItem(d.item_id)
                                            }
                                            }>X</span>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="btn-change">Lưu</p>
                        </div>
                    </div>
                ):(<NotFound/>)}
                <Footer/>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        dataConfirmedOrder: state.Posts.getConfirmedOrder.dataGetConfirmedOrder,
    };
};


export default withRouter(connect(mapStateToProps, { postCustomizeNumberRequest,postDeleteItemRequest,getConfirmedOrderRequest,apiError})(ConfirmedOrder));