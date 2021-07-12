import React, {useState, Component, useEffect} from "react";
import {Link, useLocation, withRouter} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import {connect} from "react-redux";
import Header from  "../home/myHeader";
import {getAllNotification} from "../../../store/notifications/actions";
import {apiError} from "../../../store/auth/login/actions";
import {postMarkAsReadRequest} from "../../../store/post/actions";

const Notification = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataNotification} = props;

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
            {(role === 'w')?(
                <div>
                    <Header username={location.state.username} />
                    <div>
                        <ul className="nav-notification">
                            <li>
                                <Link to="/waiter-detail-table-notification">Thông báo</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-confirm-order">Confirm order</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-change-table">Đổi Bàn</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-confirmed-order">Confirmed order</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{textAlign: "center", justifyContent: "center"}}>
                        <h2>Trang Thông Báo</h2>
                        <div className="list-Item">
                            <ul>
                                {dataNotification.data == null ? x = false: x =true }
                                {x == false ? <span>Loading...</span> : ''}
                                {dataNotification.data?.map((d, index) => (
                                        <li key={index}>
                                            <span>{d.title}</span>
                                            <span>{d.content}</span>
                                            {d.read === false ?  <span></span> : ''}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            ):(<NotFound/>)}
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