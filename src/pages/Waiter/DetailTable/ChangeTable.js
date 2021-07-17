import React, {useState, Component, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import bell from "../../../assets/images/customer/bell.png";
import a from "../../../assets/images/customer/wine.png";
import b from "../../../assets/images/customer/chicken.png";
import confirmed from "../../../assets/images/receptionist/carousel.png";
import Header from "../home/myHeader";
//scss
import "../../../assets/scss/custom/pages/waiter/changeTable.scss";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
const ChangeTable = (props) =>{
    const [role, setrole] = useState([]);

    const location  = useLocation();

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
    }, []);

    console.log('role :' + role);
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
                                }}><img src={bell}/>
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
                                    <img src={a}/>
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
                                    <img src={b}/>
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
                        <div className="list">
                            <div>
                                    <div className="page">
                                        <div className="content_all">
                                            <span className="two">MB01</span>
                                        </div>
                                    </div>
                            </div>
                            <div>
                                <div className="page">
                                    <div className="content_all">
                                        <span className="two">MB01</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="page">
                                    <div className="content_all">
                                        <span className="two">MB01</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="page">
                                    <div className="content_all">
                                        <span className="two">MB01</span>
                                    </div>
                                </div>
                            </div>
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

export default ChangeTable;