import React, {useEffect, useState, Component} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Col, Container, Row, Table} from "reactstrap/es";
import NotFound from "../../Authentication/Page401";
import * as actions from "../../../store/receptionist/actions";
import {withNamespaces} from "react-i18next";
import moment from "moment";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import ReactPaginate from "react-paginate";

// Import menuDropdown

const ViewFeedback = (props) => {

    const [page, setPage] = useState(1)

    const [pageSize] = useState(12)

    const pageCount = Math.ceil(props?.allFeedback?.total / pageSize);
    const changePage = ({ selected }) => {
        setPage(selected+1);
        props.dispatch(actions.getAllFeedbackRequest(selected+1));
    };

    console.log("pageCurrrent: "+ page)

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
                            <Table style={{width: '90%', marginTop: '20px'}} align="center"
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
                                    <th className="col-3">Thời gian</th>
                                    <th className="col-3">Về món ăn</th>
                                    <th className="col-3">Về phục vụ</th>
                                    <th className="col-3">Nội dung</th>
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
                                        <th className="col-3">
                                            <div className="table-th-manage-table">
                                                <div>{moment(fe.ts * 1000).format("DD/ MM/ YYYY")}</div>
                                            </div>
                                        </th>
                                        <th className="col-3">
                                            <div className="table-th-manage-table">
                                                <div>{fe.rate_dish}</div>
                                            </div>
                                        </th>
                                        <th className="col-3">
                                            <div className="table-th-manage-table">
                                                <div>{fe.rate_service}</div>
                                            </div>
                                        </th>
                                        <th className="col-3">
                                            <div className="table-th-manage-table">
                                                <div>{fe.content}</div>
                                            </div>
                                        </th>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="mt-3">
                                <ReactPaginate
                                    previousLabel={
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-left"/>
                                    }
                                    nextLabel={
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-right"/>
                                    }
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
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