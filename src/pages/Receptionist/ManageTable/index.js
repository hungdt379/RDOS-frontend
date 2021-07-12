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
import vector from "../../../assets/images/receptionist/Vector.png";
import searchImg from "../../../assets/images/customer/search.png";

// Import menuDropdown

const ManageTable = (props) => {

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
                            <div className="d-flex">
                                <div className="col-5"></div>
                                <div className="col-2">
                                    <h1 style={{
                                        fontFamily: 'Cabin',
                                        fontStyle: 'normal',
                                        fontWeight: 'bold',
                                        fontSize: '23px',
                                        lineHeight: '25px',
                                        color: 'black',
                                    }}>Quản lý bàn</h1>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 d-flex">
                                    <div className="col-8 d-flex">
                                        <input style={{height:'35px',
                                            border: '1px solid #000000',
                                            backgroundColor:'#ffffff',
                                            borderRight: '0px',
                                            width:'100%'
                                        }} className="search-bar" type="text" name="search" placeholder="Tìm kiếm..."
                                            // value={search}
                                            //    onChange={(e) => (
                                            //        setSearch(e.target.value),
                                            //            props.dispatch(actions.getAllSearchRequest(e.target.value))
                                            //    )}
                                        />
                                        <div style={{height:'35px',
                                            border: '1px solid #000000',
                                            borderLeft: '0px',
                                            borderRadius: '0px 20px 20px 0px',
                                            width:'100%'
                                        }} align="right" className="home-icon col-2">
                                            <a>
                                                <img style={{transform: 'matrix(-1,0,0,1,0,0)', marginTop:'5px'}} src={searchImg} className="icon-button"/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button style={{
                                            backgroundColor: '#FCBC3A',
                                            borderRadius: '10px',
                                            height: '35px',
                                            width: '100%'
                                        }}>
                                            <b style={{
                                                fontFamily: 'Cabin',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                fontSize: '13px',
                                                lineHeight: '16px',
                                                color: '#000000',
                                            }}>Tạo mã QR mới</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Table style={{width: '90%', marginTop:'20px'}} align="center"
                                   className="table mb-0">

                                <thead align="center" style={{
                                    backgroundColor: '#ffffff',
                                    color: 'black',
                                    fontFamily: 'Cabin',
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    fontSize: '15px',
                                    lineHeight: '16px',
                                }}>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bàn</th>
                                    <th>Số lượng khách đang ngồi</th>
                                    <th>Số lượng khách tối đa</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody align="center" style={{backgroundColor: '#ffffff'}}>
                                <tr style={{
                                    backgroundColor: '#F8F8FB',
                                    border: '10px solid #ffffff',
                                    fontFamily: 'Cabin',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                }}>
                                    <th><div className="table-th-manage-table">
                                        <div>1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>Bàn 1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>6</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>Mở</div>
                                    </div></th>
                                    <th>
                                        <div align="right" className="d-flex">
                                            <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                 className="avatar-xs profile-user-wid mr-2">
                                                <a align="center"
                                                   className="avatar-title rounded-circle header-re-icon"
                                                   style={{backgroundColor:'#FFEFCD'}}>
                                                    <img src={vector} className="icon-button-menu"/>
                                                </a>
                                            </div>
                                            <div style={{marginTop: 'auto', marginBottom: 'auto', width: '100%'}}>
                                                <button style={{
                                                    backgroundColor: '#FCBC3A',
                                                    borderRadius: '30px',
                                                    height: '35px',
                                                    width: '100%'
                                                }}>
                                                    <b style={{
                                                        fontFamily: 'Cabin',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        fontSize: '13px',
                                                        lineHeight: '16px',
                                                        color: '#000000',
                                                    }}>Tạo mã QR mới</b>
                                                </button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{
                                    backgroundColor: '#F8F8FB',
                                    border: '10px solid #ffffff',
                                    fontFamily: 'Cabin',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                }}>
                                    <th><div className="table-th-manage-table">
                                        <div>1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>Bàn 1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>1</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>6</div>
                                    </div></th>
                                    <th><div className="table-th-manage-table">
                                        <div>Mở</div>
                                    </div></th>
                                    <th>
                                        <div align="right" className="d-flex">
                                            <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                 className="avatar-xs profile-user-wid mr-2">
                                                <a align="center"
                                                   className="avatar-title rounded-circle header-re-icon"
                                                   style={{backgroundColor:'#FFEFCD'}}>
                                                    <img src={vector} className="icon-button-menu"/>
                                                </a>
                                            </div>
                                            <div style={{marginTop: 'auto', marginBottom: 'auto', width: '100%'}}>
                                                <button style={{
                                                    backgroundColor: '#FCBC3A',
                                                    borderRadius: '30px',
                                                    height: '35px',
                                                    width: '100%'
                                                }}>
                                                    <b style={{
                                                        fontFamily: 'Cabin',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        fontSize: '13px',
                                                        lineHeight: '16px',
                                                        color: '#000000',
                                                    }}>Xuất hóa đơn</b>
                                                </button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
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

export default withNamespaces()(connect(mapStateToProps)(ManageTable));