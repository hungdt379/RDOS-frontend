import React, {useEffect, useState, Component} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Col, Container, Row, Table} from "reactstrap/es";
import Invalid from "../../Customer/Invalid";
import NotFound from "../../Authentication/Page401";
import * as actions from "../../../store/receptionist/actions";
import {withNamespaces} from "react-i18next";
import moment from "moment";

// Import menuDropdown

const ViewFeedback = (props) => {

    const [page, setPage] = useState(1)

    const [pageSize] = useState(12)

    const prevPage = () => {
        const pg = page === 1 ? 1 : page - 1
        setPage(pg)
        props.dispatch(actions.getAllFeedbackRequest(pg));
    }

    const nextPage = () => {
        const pg = page < Math.ceil(props?.allFeedback?.total / pageSize) ? page + 1 : page
        setPage(pg)
        props.dispatch(actions.getAllFeedbackRequest(pg));
        // props.dispatch(actions.getAllNotificationReceptionist({ page, pageSize, receiver }));
    }

    const [role, setrole] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.dispatch(actions.getAllFeedbackRequest(page));
    }, []);

    console.log('role :' + role);

    return (
        <div>
            {(role === 'r') ? (
                <div>
                    <div>
                        <Header/>
                        <div style={{marginTop: '100px', marginBottom: '60px'}} align="center"
                             className="table-responsive">
                            <h1>Danh sách Feedback cho nhà hàng</h1>
                            <Table style={{width: '80%', border: '2px solid lightcoral'}} align="center"
                                   className="table mb-0">

                                <thead align="center" style={{backgroundColor: 'lightcoral', color:'black'}}>
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Về món ăn</th>
                                    <th>Về phục vụ</th>
                                    <th>Nội dung</th>
                                </tr>
                                </thead>
                                <tbody align="center">
                                {props?.allFeedback?.data?.map((fe, i) => (
                                    <tr style={{borderBottom: '2px solid black'}}>
                                        <th>{moment(fe.created_at).format("DD/ MMM/ YYYY")}</th>
                                        <th>{fe.rate_dish}</th>
                                        <th>{fe.rate_service}</th>
                                        <th>{fe.content}</th>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="inline-flex mt-2 mt-0">
                                <button
                                    onClick={prevPage}
                                >
                                    <i style={{color: "lightcoral", fontSize: '30px'}} className="bx bx-caret-left-square"></i>
                                </button>
                                <button
                                    onClick={nextPage}
                                >
                                    <i style={{color: "lightcoral", fontSize: '30px'}} className="bx bx-caret-right-square"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<NotFound/>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        allFeedback: state.Receptionist.getAllFeedback.allFeedback,
    };
};

export default withNamespaces()(connect(mapStateToProps)(ViewFeedback));