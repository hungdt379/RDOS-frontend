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
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";

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
                        <div style={{
                            marginTop: '100px',
                            marginBottom: '60px',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            backgroundColor: '#ffffff',
                            width: '90%',
                            marginLeft: 'calc(100% - 95%)',
                            borderRadius: '10px',
                        }} align="center"
                             className="table-responsive">
                            <h1 style={{
                                fontFamily: 'Cabin',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: '23px',
                                lineHeight: '25px',
                                color: 'black',
                            }}>Danh sách đánh giá cho nhà hàng</h1>
                            <Table style={{width: '90%', marginTop:'20px'}} align="center"
                                   className="table mb-0">

                                <thead align="left" style={{
                                    backgroundColor: '#ffffff',
                                    color: 'black',
                                    fontFamily: 'Cabin',
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    fontSize: '15px',
                                    lineHeight: '16px',
                                }}>
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Về món ăn</th>
                                    <th>Về phục vụ</th>
                                    <th>Nội dung</th>
                                </tr>
                                </thead>
                                <tbody align="left" style={{backgroundColor: '#ffffff'}}>
                                {props?.allFeedback?.data?.map((fe, i) => (
                                    <tr style={{
                                        backgroundColor: '#F8F8FB',
                                        border: '10px solid #ffffff',
                                        fontFamily: 'Cabin',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        lineHeight: '17px',
                                    }}>
                                        <th>{moment(fe.created_at).format("DD/ MM/ YYYY")}</th>
                                        <th>{fe.rate_dish}</th>
                                        <th>{fe.rate_service}</th>
                                        <th>{fe.content}</th>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="inline-flex mt-2 mt-0 d-flex" style={{width:'5%'}}>
                                <a
                                    onClick={prevPage}
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                        textAlign: 'right'
                                    }}
                                    className="avatar-xs">
                                    <div
                                        className="plus-background-color-re-noti avatar-title rounded-circle">
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-left"/>
                                    </div>
                                </a>
                                <a
                                    onClick={nextPage}
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                        textAlign: 'left'
                                    }}
                                    className="avatar-xs">
                                    <div
                                        className="plus-background-color-re-noti avatar-title rounded-circle">
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-right"/>
                                    </div>
                                </a>
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