import {Link} from "react-router-dom";
import React, {useState} from "react";
import bell from "../../../assets/images/waiter/bell.png";
import clock from "../../../assets/images/waiter/sand-clock (1).png";
import arrow from "../../../assets/images/waiter/arrows-exchange (1).png";
import carousel from "../../../assets/images/waiter/carousel.png";

const TableNav = (props) => {
    const [tableChoose] = useState(props.item.navChoose);
    return(

        <div className="nav-notification">
            <div className="nav_form">
                <div className="nav-item">
                    <label>
                        <input
                            type="radio"
                            value={'1'}
                            id={'1'}
                            style={{opacity: '0'}}
                            name="tableCheck"
                            className="check-nav"
                            checked={tableChoose === '1'}
                        />
                        <div className="link_form">
                            <Link to= {{ pathname:'/waiter-detail-table-notification',
                                state:{
                                    _id: props.item._id,
                                    username: props.item.username
                                }
                            }}><img style={{width: '16px', height: '23px'}} src={bell}/>
                            </Link>
                        </div>
                    </label>

                    <p>Thông báo</p>
                </div>
            </div>

            <div className="nav_form">
                <div className="nav-item">
                    <label>
                        <input
                            type="radio"
                            value={'2'}
                            id={'2'}
                            style={{opacity: '0'}}
                            name="tableCheck"
                            className="check-nav"
                            checked={tableChoose === '2'}
                        />
                        <div className="link_form">
                            <Link to= {{ pathname:'/waiter-detail-table-confirm-order',
                                state:{
                                    _id: props.item._id,
                                    username: props.item.username
                                }
                            }}>
                                <img style={{width: '11px', height:'20px',marginTop:"9px"}} src={clock}/>
                            </Link>

                        </div>
                    </label>

                    <p>Chờ xác nhận</p>
                </div>

            </div>

            <div className="nav_form">
                <div className="nav-item">
                    <label>
                        <input
                            type="radio"
                            value={'3'}
                            id={'3'}
                            style={{opacity: '0'}}
                            name="tableCheck"
                            className="check-nav"
                            checked={tableChoose === '3'}
                        />
                        <div className="link_form">
                            <Link to= {{ pathname:'/waiter-detail-table-change-table',
                                state:{
                                    _id: props.item._id,
                                    username: props.item.username
                                }
                            }}>
                                <img style={{width: '19px', height:'15px',marginTop:"10px"}} src={arrow}/>
                            </Link>
                        </div>
                    </label>

                    <p>Đổi Bàn</p>
                </div>
            </div>

            <div className="nav_form">
                <div className="nav-item">
                    <label>
                        <input
                            type="radio"
                            value={'4'}
                            id={'4'}
                            style={{opacity: '0'}}
                            name="tableCheck"
                            className="check-nav"
                            checked={tableChoose === '4'}
                        />
                        <div className="link_form">
                            <Link to= {{ pathname:'/waiter-detail-table-confirmed-order',
                                state:{
                                    _id: props.item._id,
                                    username: props.item.username
                                }
                            }}>
                                <img style={{width: '19px', height:'15px',marginTop:"10px"}} src={carousel}/>
                            </Link>
                        </div>
                    </label>

                    <p>Món đã gọi</p>
                </div>
            </div>

        </div>

    );

}


export default TableNav;