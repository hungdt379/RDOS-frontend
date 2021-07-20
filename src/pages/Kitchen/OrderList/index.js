import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../assets/scss/custom/pages/kitchen/kitchen.scss";

import Header from "../../Kitchen/HeaderKitchen";
import NotFound from "../../Authentication/Page401";
import * as actions from "../../../store/kitchen/actions";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import mathMinus from "../../../assets/images/receptionist/math-minus.png";
import mathPlus from "../../../assets/images/receptionist/math-plus.png";
import ReactPaginate from "react-paginate";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import trash from "../../../assets/images/receptionist/trashre.png";
import moveRight from "../../../assets/images/waiter/move-right.png";
import {Modal} from "reactstrap";

const OrderList = (props) => {
    const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
    let statusState = [
        {id: 's1', code: "confirmed", name: "Đã confirm"},
        {id: 's2', code: "paid", name: "Đã thanh toán"}
    ];

    const [displayStatus, setStatus] = useState("confirmed");

    const [pageSize] = useState(10)

    const [page, setPage] = useState(1)
    const pageCount = Math.ceil(props?.allDishInConfirm?.total / pageSize);
    const changePage = ({selected}) => {
        setPage(selected + 1);
        props.dispatch(actions.getAllDishInConfirmRequest(selected + 1));
    };

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.dispatch(actions.getAllDishInConfirmRequest(page));
    }, []);

    console.log('role :' + role);

    return (
        <React.Fragment>
            {(role === 'k') ? (
                <div className="display-receptionist">
                    <Header/>
                    <div align="center" className="receptionist-order">
                        <div align="center" className="col-xl-12">
                            <div className="side-content">
                                <div className="list-order-re">
                                    <b>
                                        Danh sách Order
                                    </b>
                                </div>
                                {/*<div className="ra-button-re d-flex">*/}
                                {/*    <div className="col-2"></div>*/}
                                {/*    <div className="col-8 d-flex">*/}
                                {/*        {statusState.map(result => (*/}
                                {/*            <div align="center" className="col-6" style={{width: '100%'}}>*/}
                                {/*                <label style={{width: '100%'}}>*/}
                                {/*                    <input*/}
                                {/*                        type="radio"*/}
                                {/*                        id={result.id}*/}
                                {/*                        style={{opacity: '0'}}*/}
                                {/*                        className="status-check-re"*/}
                                {/*                        value={result.code}*/}
                                {/*                        name="statusValue"*/}
                                {/*                        checked={displayStatus === result.code}*/}
                                {/*                        onChange={(e) => {*/}
                                {/*                            setStatus(e.target.value)*/}
                                {/*                            // props.dispatch(actions.getListConfirmOrderReRequest(page));*/}
                                {/*                            // props.dispatch(actions.getListPaidOrderReRequest(page));*/}
                                {/*                        }}*/}
                                {/*                    /> <b className="input-status-re">{result.name}</b>*/}
                                {/*                    <div htmlFor={result.id} className="line-color"></div>*/}
                                {/*                </label>*/}
                                {/*            </div>*/}
                                {/*        ))}*/}
                                {/*    </div>*/}
                                {/*    <div className="col-2"></div>*/}
                                {/*</div>*/}
                                <div>
                                    <div style={{
                                        backgroundColor: '#ffffff',
                                        border: '0px solid #ffffff',
                                    }} className="card-order d-flex">
                                        <div align="left" className="col-3 card-detail-order-text">
                                            <b>Mã order</b>
                                        </div>
                                        <div align="left" className="col-2 card-detail-order-text">
                                            <b>Mã bàn</b>
                                        </div>
                                        <div align="left" className="col-2 card-detail-order-text">
                                            <b>Tên món</b>
                                        </div>
                                        <div style={{paddingLeft: '0px'}} align="center"
                                             className="col-1 card-detail-order-text">
                                            <b>Số lượng</b>
                                        </div>
                                        <div align="center"
                                             className="col-2 card-detail-order-text">
                                            <b>Trạng thái</b>
                                        </div>
                                        <div align="center"
                                             className="col-1 card-detail-order-text">
                                            <b>Xuất thông tin</b>
                                        </div>
                                        <div align="center"
                                             className="col-1 card-detail-order-text">
                                            <b>Xóa</b>
                                        </div>
                                    </div>
                                    <div>
                                        {props?.allDishInConfirm?.data?.map((it, i) => (
                                                <div className="card-order d-flex">
                                                    <div align="left"
                                                         className="col-3 card-detail-order-text-child">
                                                        <div>{it?._id}</div>
                                                    </div>
                                                    <div align="left"
                                                         className="col-2 card-detail-order-text-child">
                                                        <div>{it?.table_name}</div>
                                                    </div>
                                                    <div align="left"
                                                         className="col-2 card-detail-order-text-child">
                                                        <div>{it?.item_name}</div>
                                                    </div>
                                                    <div align="center"
                                                         className="col-1 card-detail-order-text-child">
                                                        <div>{it?.quantity}</div>
                                                    </div>
                                                    <div align="center"
                                                         className="col-2 card-detail-order-text-child">
                                                        <b style={{color: '#FCBC3A'}}>{it?.status}</b>
                                                    </div>
                                                    <div align="center"
                                                         className="col-1 card-detail-order-text-child">
                                                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                             className="avatar-xs profile-user-wid mr-3">
                                                            <a align="center"
                                                               className="avatar-title rounded-circle"
                                                               style={{
                                                                   backgroundColor: '#FFEFCD',
                                                                   border: '1px solid #FCBC3A'
                                                               }}
                                                                onClick={(e) => {
                                                                    props.dispatch(actions.updateStatusOfDishRequest(it?._id))
                                                                    setOpenUpdateStatus(true)
                                                                    setTimeout(() => {
                                                                        setOpenUpdateStatus(false)
                                                                        props.dispatch(actions.getAllDishInConfirmRequest(page));
                                                                    }, 1500)
                                                                }}
                                                            >
                                                                <img src={moveRight}
                                                                     className="icon-button-menu-manage-table"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div align="center"
                                                         className="col-1 card-detail-order-text-child">
                                                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                             className="avatar-xs profile-user-wid mr-3">
                                                            <a align="center"
                                                               className="avatar-title rounded-circle"
                                                               style={{
                                                                   backgroundColor: '#FFD1D1',
                                                                   border: '1px solid red'
                                                               }}
                                                            >
                                                                <img src={trash}
                                                                     className="icon-button-menu-manage-table"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
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
                        </div>
                    </div>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openUpdateStatus}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Xuất phiếu thành công !</b>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (<NotFound/>)}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        allDishInConfirm: state.Kitchen.allDishInConfirmKitchen.allDishInConfirm,
        allUpdateStatusOfDish: state.Kitchen.updateStatusOfDishKitchen.allUpdateStatusOfDish
    };
};

export default withNamespaces()(connect(mapStateToProps)(OrderList));