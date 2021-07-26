import React, {useState, useEffect} from "react";
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
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import TableNav from "./TableNav";

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


    const table = {
        _id: location.state._id,
        username: location.state.username,
        navChoose: '1',
    }

    return(
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w')?(
                    <div className="container_detail">
                        <Header username={location.state.username} />
                        <TableNav item={table}/>
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