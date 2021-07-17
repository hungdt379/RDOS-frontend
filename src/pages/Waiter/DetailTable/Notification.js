import React, {useState, Component, useEffect} from "react";
import {Link, useLocation, withRouter} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import {connect} from "react-redux";
import Header from  "../home/myHeader";
import {getAllNotification} from "../../../store/notifications/actions";
import {apiError} from "../../../store/auth/login/actions";
import {postMarkAsReadRequest} from "../../../store/post/actions";
//scss
import "../../../assets/scss/custom/pages/waiter/notification.scss";
//image
import bell from "../../../assets/images/customer/bell.png";
import a from "../../../assets/images/customer/wine.png";
import b from "../../../assets/images/customer/chicken.png";
import confirmed from "../../../assets/images/receptionist/carousel.png";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const Notification = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataNotification} = props;

    console.log(dataNotification.data);

    const value = {
        table_id:location.state._id,
        page: 1,
        pageSize: 5,
    }

    function load(){
        props.getAllNotification(value);
    }
    let x = false;
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.postMarkAsReadRequest(value);
        load()
        dataNotification.data = null;

    }, []);


    return(
        <React.Fragment>
            <div className="display-customer">


            {(role === 'w')?(
                <div className="container_detail">
                    <Header username={location.state.username} />
                    <div className="nav-notification">
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
                                    <img style={{width: '24px', height:'24px'}} src={a}/>
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
                                    <img style={{width: '24px', height: '24px'}} src={b}/>
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
                    <div style={{textAlign: "center", justifyContent: "center"}}>

                        <div className="list-Item">

                                {dataNotification.data?.map((d, index) => (
                                        <div className="item-form" style={d.read == false ? {backgroundColor: "#EEEEEE"} : {backgroundColor: "#FFEFCD"} } key={index}>
                                            <span>{d.title}</span>
                                            <span>{d.content}</span>
                                            {/*{d.read === false ?  <span></span> : ''}*/}
                                        </div>
                                    )
                                )}
                        </div>
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
        dataNotification: state.Notification.getAllNotifications.allNotifications,
        dataMarkAsRead: state.Posts.postMarkAsRead.dataPostMarkAsRead
    };
};

export default withRouter(connect(mapStateToProps,{postMarkAsReadRequest,getAllNotification,apiError}) (Notification));