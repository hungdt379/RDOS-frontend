import React, {useState, Component, useEffect} from "react";
import {Link, withRouter} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import NotFound from "../../Authentication/Page401";
import Header from "../home/myHeader";
//scss
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/checkList.scss";
import {connect} from "react-redux";
import {getConfirmedOrderRequest, postDeleteItemRequest} from "../../../store/post/actions";
import {apiError} from "../../../store/auth/login/actions";
import {getCheckListRequest} from "../../../store/notifications/actions";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
function CheckList(props){

    const value = {
        pageSize: 10
    }
    const {dataCheckListPage} = props;

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.getCheckListRequest(value);
    }, []);

    return(
        <React.Fragment>
            <div className="display-customer">
            {(role === 'w')?(
                <div className="container_checkList">
                    <Header/>
                    <div style={{textAlign: "center", justifycontent: "center"}}>
                        <h2>Check List</h2>
                        <PerfectScrollbar>
                        <div className="list-Item_checkList">
                            {dataCheckListPage?.map((d, index) => (
                                    <div className="item-form-checkList" key={index}>
                                        <span>{d.item_name}</span>
                                        <span>{d.quantity}</span>
                                        <div className="save-button">Xác Nhận</div>
                                        <span className="contain_button">X</span>
                                    </div>
                                )
                            )}
                        </div>
                        </PerfectScrollbar>
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
        dataCheckListPage: state.Notification.getCheckList.dataCheckList,
    };
};


export default withRouter(connect(mapStateToProps, {getCheckListRequest,apiError})(CheckList));