import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link, useParams} from "react-router-dom";
import Header from "../HeaderReception";
import NotFound from "../../Authentication/Page401";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import mathMinus from "../../../assets/images/receptionist/math-minus.png";
import mathPlus from "../../../assets/images/receptionist/math-plus.png";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import * as actions from "../../../store/receptionist/actions";
import {withNamespaces} from "react-i18next";
import {authHeaderGetApi} from "../../../helpers/jwt-token-access/auth-token-header";
import {Modal} from "reactstrap";
import ReactPaginate from "react-paginate";

// Import menuDropdown

const OrderList = (props) => {
    console.log("tableId: " + props?.detailConfirmOrderReceptionist?.data?._id);

    let statusState = [
        {id: 's1', code: "confirmed", name: "Đã confirm"},
        {id: 's2', code: "paid", name: "Đã thanh toán"}
    ];

    const [displayStatus, setStatus] = useState("confirmed");
    const [voucher, setVoucher] = useState(0);
    const [_id, setOrderId] = useState('');

    console.log("status: " + displayStatus)
    console.log("id: " + _id)
    console.log("voucher: " + voucher)

    const data = {_id, voucher};

    console.log("data: " + data)

    const [orderState, setOrderState] = useState([]);
    const [itemState, setItemState] = useState([]);

    const [pageSize] = useState(10)

    const [page, setPage] = useState(1)
    const pageCount = Math.ceil(props?.listConfirmOrderReceptionist?.total / pageSize);
    const changePage = ({selected}) => {
        setPage(selected + 1);
        props.dispatch(actions.getListConfirmOrderReRequest(selected + 1));
    };

    const [pageComplete, setPageComplete] = useState(1)
    const pageCountComplete = Math.ceil(props?.listPaidOrderReceptionist?.total / pageSize);
    const changePageComplete = ({selectedComplete}) => {
        setPageComplete(selectedComplete + 1);
        props.dispatch(actions.getListPaidOrderReRequest(selectedComplete + 1));
    };

    const prevPage = () => {
        const pg = page === 1 ? 1 : page - 1
        setPage(pg)
        props.dispatch(actions.getListConfirmOrderReRequest(pg));
    }

    const nextPage = () => {
        const pg = page < Math.ceil(props?.listConfirmOrderReceptionist?.total / pageSize) ? page + 1 : page
        setPage(pg)
        props.dispatch(actions.getListConfirmOrderReRequest(pg));
        // props.dispatch(actions.getAllNotificationReceptionist({ page, pageSize, receiver }));
    }

    const prevPageComplete = () => {
        const pg = pageComplete === 1 ? 1 : pageComplete - 1
        setPageComplete(pg)
        props.dispatch(actions.getListPaidOrderReRequest(pg));
    }

    const nextPageComplete = () => {
        const pg = pageComplete < Math.ceil(props?.listPaidOrderReceptionist?.total / pageSize) ? pageComplete + 1 : pageComplete
        setPageComplete(pg)
        props.dispatch(actions.getListPaidOrderReRequest(pg));
        // props.dispatch(actions.getAllNotificationReceptionist({ page, pageSize, receiver }));
    }

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.dispatch(actions.getListConfirmOrderReRequest(page));
        props.dispatch(actions.getListPaidOrderReRequest(page));
        //props.dispatch(actions.getDetailConfirmOrderReRequest(table_id));
    }, []);

    console.log('role :' + role);

    const handleEnterVoucher = () => {
        props.dispatch(actions.postEnterVoucherReRequest({data}))
        setTimeout(() => {
            props.dispatch(actions.getDetailConfirmOrderReRequest(props?.detailConfirmOrderReceptionist?.data?._id))
        }, 1000)
    };

    const [matchTable, setMatchTable] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    console.log("checkedStateTestOrder: " + checkedState);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const testMatchTable = updatedCheckedState.map(
            (currentState, index) => {
                if (currentState === true) {
                    return "table_id[" + index + "]=" + (props?.listConfirmOrderReceptionist?.data[index].table_id);
                }
            },
        );
        setMatchTable(testMatchTable.filter(function (el) {
            return el != null;
        }));
    };

    console.log("matchTable: " + 'http://165.227.99.160/api/receptionist/order/confirm/match?' + matchTable.join("&"));
    const [toggleSwitch, settoggleSwitch] = useState(false);
    console.log("toggleSwitch: " + toggleSwitch);

    const [openMatchingSuccess, setOpenMatchingSuccess] = useState(false);
    const [openInvoiceSuccess, setOpenInvoiceSuccess] = useState(false);
    const [openMatchingFail, setOpenMatchingFail] = useState(false);

    const menu = {
        menuChoose: '1',
    }

    return (
        <React.Fragment>
            {(role === 'r') ? (
                <div>
                    <div className="display-receptionist">
                        <Header item={menu}/>
                        <div align="center" className="receptionist-order">
                            <div align="center" className="col-xl-6">
                                <div className="side-content">
                                    <div className="list-order-re">
                                        <b>
                                            Danh sách order
                                        </b>
                                    </div>
                                    <div className="ra-button-re d-flex">
                                        <div className="col-2"></div>
                                        <div className="col-8 d-flex">
                                            {statusState.map(result => (
                                                <div align="center" className="col-6" style={{width: '100%'}}>
                                                    <label style={{width: '100%'}}>
                                                        <input
                                                            type="radio"
                                                            id={result.id}
                                                            style={{opacity: '0'}}
                                                            className="status-check-re"
                                                            value={result.code}
                                                            name="statusValue"
                                                            checked={displayStatus === result.code}
                                                            onChange={(e) => {
                                                                setStatus(e.target.value)
                                                                props.dispatch(actions.getListConfirmOrderReRequest(page));
                                                                props.dispatch(actions.getListPaidOrderReRequest(pageComplete));
                                                            }}
                                                        /> <b className="input-status-re">{result.name}</b>
                                                        <div for={result.id} className="line-color"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    {(displayStatus === 'confirmed') ? (
                                        <div>
                                            <PerfectScrollbar className="mh-55">
                                                {props?.listConfirmOrderReceptionist?.data?.map((lco, i) => (
                                                    <div>
                                                        <label className="item-menu-re d-flex">
                                                            <input
                                                                onChange={() => {
                                                                    handleOnChange(i);
                                                                }}
                                                                checked={checkedState[i]}
                                                                type="checkbox"
                                                                id={lco.table_id}
                                                                value={lco.table_id}
                                                                name={lco.table_id}
                                                                style={{display: 'none'}}
                                                                className="check-re-order"
                                                                disabled={(toggleSwitch === true) ? false : true}
                                                            />
                                                            <div htmlFor={lco._id}
                                                                 className="col-11 d-flex menu-item-bar-re">
                                                                <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                                     align="left" className="col-11 d-flex">
                                                                    <div align="center" className="col-6 item-cost-re">
                                                                        <b>{lco._id}</b>
                                                                    </div>
                                                                    <div align="center" className="col-3 item-cost-re">
                                                                        <b>{lco.table_name}</b>
                                                                    </div>
                                                                    <div align="center" className="col-3 item-name-re"
                                                                         style={{color: lco.status === "confirmed" ? "lightcoral" : "green"}}>
                                                                        {lco.status === "confirmed" ? "Đã xác nhận" : "Hoàn thành"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="add-button-re col-1">
                                                                <Link onClick={(e) => {
                                                                    // window.location.pathname = '/receptionist-home/' + lco.table_id
                                                                    props.dispatch(actions.getDetailConfirmOrderReRequest(lco._id))
                                                                    setOrderId(lco._id)
                                                                }}>
                                                                    <a
                                                                        style={{
                                                                            marginRight: 'auto',
                                                                            marginLeft: 'auto'
                                                                        }}
                                                                        className="avatar-xs">
                                                                        <div
                                                                            className="plus-background-color-re avatar-title rounded-circle">
                                                                            <img src={chevonRight}
                                                                                 className="plus-icon-button-re"/>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))
                                                }
                                            </PerfectScrollbar>
                                            <div className="d-flex">
                                                <div className="gop-hoa-don col-4 d-flex" align="left">
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
                                                <div className="gop-hoa-don col-4" align="right">
                                                    <label style={{width: '50%'}}>
                                                        <input
                                                            className="check-all-button-matching"
                                                            type="checkbox"
                                                            onChange={() => {
                                                                settoggleSwitch(!toggleSwitch)
                                                                setCheckedState(new Array(props?.listConfirmOrderReceptionist?.data?.length).fill(false))
                                                            }}
                                                            checked={(toggleSwitch === true) ? true : false}
                                                        />
                                                        <div className="choose-all-matching">
                                                            <div className="choose-text-matching">Chọn nhiều hóa đơn
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="gop-hoa-don col-4" align="right"
                                                     style={{height: '60px', alignItems: 'center'}}>
                                                    {(toggleSwitch === true) ? (
                                                        <button
                                                            onClick={() => {
                                                                if (matchTable.length > 1) {
                                                                    fetch('http://165.227.99.160/api/receptionist/order/confirm/match?' + matchTable.join("&"), {
                                                                        method: 'POST',
                                                                        headers: authHeaderGetApi(),
                                                                    })
                                                                        .then(res => res.json())
                                                                        .then(data => {
                                                                            props.dispatch(actions.getDetailConfirmOrderReRequest(data.data._id))
                                                                            setOrderId(data.data._id)
                                                                            setOpenMatchingSuccess(true)
                                                                            setTimeout(() => {
                                                                                setOpenMatchingSuccess(false)
                                                                                settoggleSwitch(false)
                                                                                setCheckedState(new Array(props?.listConfirmOrderReceptionist?.data?.length).fill(false))
                                                                            }, 1500)
                                                                        })
                                                                        .catch(error => console.log('ERROR'))
                                                                } else {
                                                                    setOpenMatchingFail(true)
                                                                    setTimeout(() => {
                                                                        setOpenMatchingFail(false)
                                                                    }, 1500)
                                                                }
                                                            }}
                                                            className="button-gop-hoa-don">
                                                            <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                                        </button>
                                                    ) : (
                                                        <button style={{backgroundColor: '#6a7187'}}
                                                                className="button-gop-hoa-don" disabled={true}>
                                                            <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <PerfectScrollbar className="mh-55">
                                                {props?.listPaidOrderReceptionist?.data?.map((lpo, i) => (
                                                    <div>
                                                        <label className="item-menu-re d-flex">
                                                            <input
                                                                type="checkbox"
                                                                // checked={d.select}
                                                                id={lpo._id}
                                                                name={lpo._id}
                                                                style={{display: 'none'}}
                                                                className="check-re-order"
                                                                disabled={true}
                                                            />
                                                            <div htmlFor={lpo._id}
                                                                 className="col-11 d-flex menu-item-bar-re">
                                                                <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                                     align="left" className="col-11 d-flex">
                                                                    <div align="center" className="col-6 item-cost-re">
                                                                        <b>{lpo._id}</b>
                                                                    </div>
                                                                    <div align="center" className="col-3 item-cost-re">
                                                                        <b>{lpo.table_name}</b>
                                                                    </div>
                                                                    <div align="center" className="col-3 item-name-re"
                                                                         style={{color: lpo.status === "confirmed" ? "lightcoral" : "green"}}>
                                                                        {lpo.status === "confirmed" ? "Đã xác nhận" : "Hoàn thành"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="add-button-re col-1">
                                                                <Link onClick={(e) => {
                                                                    // window.location.pathname = '/receptionist-home/' + lco.table_id
                                                                    props.dispatch(actions.getDetailConfirmOrderReRequest(lpo._id))
                                                                    setOrderId(lpo._id)
                                                                }}>
                                                                    <a
                                                                        style={{
                                                                            marginRight: 'auto',
                                                                            marginLeft: 'auto'
                                                                        }}
                                                                        className="avatar-xs">
                                                                        <div
                                                                            className="plus-background-color-re avatar-title rounded-circle">
                                                                            <img src={chevonRight}
                                                                                 className="plus-icon-button-re"/>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))
                                                }
                                            </PerfectScrollbar>
                                            <div className="d-flex">
                                                <div className="gop-hoa-don col-6 d-flex" align="left">
                                                    <ReactPaginate
                                                        previousLabel={
                                                            <img src={chevonRight}
                                                                 className="plus-icon-button-re-left"/>
                                                        }
                                                        nextLabel={
                                                            <img src={chevonRight}
                                                                 className="plus-icon-button-re-right"/>
                                                        }
                                                        pageCount={pageCountComplete}
                                                        onPageChange={changePageComplete}
                                                        containerClassName={"paginationBttns"}
                                                        previousLinkClassName={"previousBttn"}
                                                        nextLinkClassName={"nextBttn"}
                                                        disabledClassName={"paginationDisabled"}
                                                        activeClassName={"paginationActive"}
                                                    />
                                                </div>
                                                <div className="gop-hoa-don col-6" align="right"
                                                     style={{height: '60px', alignItems: 'center'}}>
                                                    <button style={{backgroundColor: '#6a7187'}}
                                                            className="button-gop-hoa-don" disabled={true}>
                                                        <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div align="center" className="col-xl-6">
                                <div className="side-content">
                                    <div className="list-order-re">
                                        <b>
                                            Chi tiết Order
                                        </b>
                                    </div>
                                    <div style={{height: '75px', backgroundColor: '#F8F8FB'}}
                                         className="ra-button-re d-flex">
                                        <div align="center" className="col-4 detail-order-re">
                                            <div className='detail-order-top-re'>Mã Order</div>
                                            <div
                                                className='detail-order-down-re'>{props?.detailConfirmOrderReceptionist?.data?._id}</div>
                                        </div>
                                        <div align="center" className="col-4 detail-order-re">
                                            <div className='detail-order-top-re'>Mã Bàn</div>
                                            <div
                                                className='detail-order-down-re'>{props?.detailConfirmOrderReceptionist?.data?.table_name}</div>
                                        </div>
                                        <div align="center" className="col-4 detail-order-re">
                                            <div className='detail-order-top-re'>Trạng thái</div>
                                            <div
                                                style={{color: (props?.detailConfirmOrderReceptionist?.data?.status === "confirmed" || props?.detailConfirmOrderReceptionist?.data?.status === "matching") ? "lightcoral" : "green"}}
                                                className='detail-order-down-re'>
                                                {props?.detailConfirmOrderReceptionist?.data?.status === "confirmed"
                                                    ? "Đã xác nhận" : props?.detailConfirmOrderReceptionist?.data?.status === "matching"
                                                        ? "Gộp đơn" : props?.detailConfirmOrderReceptionist?.data?.status === "completed"
                                                            ? "Hoàn thành" : null}
                                            </div>
                                        </div>
                                    </div>
                                    {(props?.detailConfirmOrderReceptionist?.data !== undefined) ? (
                                            <div>
                                                <PerfectScrollbar className="mh-55">
                                                    <div style={{
                                                        backgroundColor: '#ffffff',
                                                        border: '0px solid #ffffff',
                                                    }} className="card-order d-flex">
                                                        <div align="left" className="col-3 card-detail-order-text">
                                                            <b>Món ăn</b>
                                                        </div>
                                                        <div align="left" className="col-2 card-detail-order-text">
                                                            <b>Giá tiền</b>
                                                        </div>
                                                        <div style={{paddingLeft: '0px'}} align="center"
                                                             className="col-2 card-detail-order-text">
                                                            <b>Số lượng</b>
                                                        </div>
                                                        <div align="right" className="col-2 card-detail-order-text">
                                                            <b>Tổng tiền</b>
                                                        </div>
                                                        <div style={{marginRight: '30px'}} align="right"
                                                             className="col-3 card-detail-order-text">
                                                            <b>Trạng thái</b>
                                                        </div>
                                                    </div>
                                                    {props?.detailConfirmOrderReceptionist?.data?.item.map((it, i) => (
                                                            <div className="card-order d-flex">
                                                                <div align="left"
                                                                     className="col-3 card-detail-order-text-child">
                                                                    <div>{it?.detail_item?.name}</div>
                                                                </div>
                                                                <div align="left"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    <div>{it?.detail_item?.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                                </div>
                                                                <div style={{paddingLeft: '0px'}} align="center"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    {(props?.detailConfirmOrderReceptionist?.data?.status === 'confirmed') ? (
                                                                        <div style={{
                                                                            backgroundColor: '#ffffff',
                                                                            borderRadius: '30px'
                                                                        }}
                                                                             className="d-flex">
                                                                            <div align="center" className="col-4">
                                                                                <a onClick={() => {
                                                                                    if (it?.quantity > 0) {
                                                                                        props.dispatch(actions.postCustomizeNumberItemReRequest(props?.detailConfirmOrderReceptionist?.data?._id, it?.item_id, 0))
                                                                                        setTimeout(() => {
                                                                                            props.dispatch(actions.getDetailConfirmOrderReRequest(props?.detailConfirmOrderReceptionist?.data?._id))
                                                                                            setOrderId(props?.detailConfirmOrderReceptionist?.data?._id)
                                                                                        }, 1000)
                                                                                    }
                                                                                }}>
                                                                                    <img src={mathMinus}/>
                                                                                </a>
                                                                            </div>
                                                                            <div align="center" className="col-4">
                                                                                {it?.quantity}
                                                                            </div>
                                                                            <div align="center" className="col-4">
                                                                                <a onClick={() => {
                                                                                    props.dispatch(actions.postCustomizeNumberItemReRequest(props?.detailConfirmOrderReceptionist?.data?._id, it?.item_id, 1))
                                                                                    setTimeout(() => {
                                                                                        props.dispatch(actions.getDetailConfirmOrderReRequest(props?.detailConfirmOrderReceptionist?.data?._id))
                                                                                        setOrderId(props?.detailConfirmOrderReceptionist?.data?._id)
                                                                                    }, 1000)
                                                                                }}>
                                                                                    <img src={mathPlus}/>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>{it?.quantity}</div>
                                                                    )}
                                                                </div>
                                                                <div align="right"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    <b>{it?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
                                                                </div>
                                                                <div align="right"
                                                                     className="col-3 card-detail-order-text-child"
                                                                     style={{
                                                                         color: (props?.detailConfirmOrderReceptionist?.data?.status == "confirmed" || props?.detailConfirmOrderReceptionist?.data?.status === "matching") ? "lightcoral" : "green",
                                                                         marginRight: '30px'
                                                                     }}>
                                                                    {props?.detailConfirmOrderReceptionist?.data?.status === "confirmed" ? "Đã xác nhận" : props?.detailConfirmOrderReceptionist?.data?.status === "matching" ? "Gộp đơn" : "Hoàn thành"}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </PerfectScrollbar>
                                                <div style={{height: '60px', width: '98%'}} className="d-flex">
                                                    <div align="left" className="col-3">
                                                        <div style={{
                                                            fontFamily: 'Cabin',
                                                            fontStyle: 'normal',
                                                            fontWeight: 'normal',
                                                            fontSize: '12px',
                                                            lineHeight: '15px',
                                                            color: '#000000',
                                                        }}>Tổng tiền:
                                                        </div>
                                                        <div style={{
                                                            fontFamily: 'Cabin',
                                                            fontStyle: 'normal',
                                                            fontWeight: 'bold',
                                                            fontSize: '18px',
                                                            lineHeight: '22px',
                                                            color: '#000000',
                                                        }}>
                                                            {(props?.detailConfirmOrderReceptionist?.data?.new_total_cost !== undefined) ?
                                                                (props?.detailConfirmOrderReceptionist?.data?.new_total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) :
                                                                (props?.detailConfirmOrderReceptionist?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
                                                        </div>
                                                        {(props?.detailConfirmOrderReceptionist?.data?.new_total_cost !== undefined) ?
                                                            (<div
                                                                style={{
                                                                    fontFamily: 'Cabin',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '12px',
                                                                    lineHeight: '15px',
                                                                    color: '#000000',
                                                                }}
                                                            >
                                                                <div>Giá gốc: {props?.detailConfirmOrderReceptionist?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                                <div>Voucher: {props?.detailConfirmOrderReceptionist?.data?.voucher} %</div>
                                                            </div>) : (null)}
                                                    </div>
                                                    <div align="center" className="col-4">
                                                        {(props?.detailConfirmOrderReceptionist?.data?.status === "confirmed" || props?.detailConfirmOrderReceptionist?.data?.status === "matching") ? (
                                                            <div className="d-flex">
                                                                <div>
                                                                    <input style={{
                                                                        height: 50,
                                                                        width: '100%',
                                                                        borderRadius: '10px'
                                                                    }}
                                                                           type="text"
                                                                           name="voucher"
                                                                           placeholder="Mã giảm giá..."
                                                                        //value={search}
                                                                           onChange={(e) => (
                                                                               setVoucher(e.target.value)
                                                                           )}
                                                                    />
                                                                </div>
                                                                <button
                                                                    onClick={handleEnterVoucher}
                                                                    style={{
                                                                        height: 50,
                                                                        width: 50,
                                                                        borderRadius: '10px',
                                                                        backgroundColor: '#FCBC3A',
                                                                        fontFamily: 'Cabin',
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 'bold',
                                                                    }}
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    height: 50,
                                                                    width: 100,
                                                                    borderRadius: '10px',
                                                                    border: '2px solid #FCBC3A',
                                                                    fontFamily: 'Cabin',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '16px',
                                                                    backgroundColor: '#FFEFCD',
                                                                }}
                                                            >
                                                                Voucher: {props?.detailConfirmOrderReceptionist?.data?.voucher} %
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div align="left" className="col-3">
                                                        <div>
                                                            <textarea style={{
                                                                height: 50,
                                                                width: '100%',
                                                                borderRadius: '10px'
                                                            }}>
                                                                abc
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-2">
                                                        {(props?.detailConfirmOrderReceptionist?.data?.status === "confirmed" || props?.detailConfirmOrderReceptionist?.data?.status === "matching")
                                                            ? (
                                                                <button
                                                                    onClick={() => {
                                                                        props.dispatch(actions.getInvoiceCompletedOrderReRequest(_id))
                                                                        setOpenInvoiceSuccess(true)
                                                                        setTimeout(() => {
                                                                            props.history.push('/receptionist-home')
                                                                            setOpenInvoiceSuccess(false)
                                                                            props.dispatch(actions.getListConfirmOrderReRequest(page));
                                                                            props.dispatch(actions.getListPaidOrderReRequest(page));
                                                                        }, 1500)
                                                                    }}
                                                                    style={{
                                                                        backgroundColor: '#FCBC3A',
                                                                        borderRadius: '10px',
                                                                        height: '45px',
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
                                                            )
                                                            : (
                                                                <button disabled={true} style={{
                                                                    backgroundColor: '#6a7187',
                                                                    borderRadius: '10px',
                                                                    height: '45px',
                                                                    width: '100%'
                                                                }}>
                                                                    <b style={{
                                                                        fontFamily: 'Cabin',
                                                                        fontStyle: 'normal',
                                                                        fontWeight: '600',
                                                                        fontSize: '13px',
                                                                        lineHeight: '16px',
                                                                        color: '#1E1C19',
                                                                    }}>Xuất hóa đơn</b>
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div style={{fontSize: '20px'}}>Hãy chọn 1 Order để xem
                                                chi
                                                tiết
                                            </div>
                                        )}
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
                    }} isOpen={openMatchingSuccess}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Gộp Order thành công !</b>
                            </div>
                        </div>
                    </Modal>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openInvoiceSuccess}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Xuất hóa đơn thành công !</b>
                            </div>
                        </div>
                    </Modal>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openMatchingFail}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "red", fontSize: '50px'}}
                               className="bx bx-calendar-exclamation bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Bạn phải chọn nhiều hơn 1 Order để gộp !</b>
                            </div>
                        </div>
                    </Modal>
                    {/*<Footer/>*/}
                </div>
            ) : (<NotFound/>)}
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        listConfirmOrderReceptionist: state.Receptionist.getListConfirmOrderReceptionist.listConfirmOrderReceptionist,
        detailConfirmOrderReceptionist: state.Receptionist.getDetailConfirmOrderReceptionist.detailConfirmOrderReceptionist,
        enterVoucherReceptionist: state.Receptionist.postEnterVoucherReceptionist.enterVoucherReceptionist,
        invoiceCompletedReceptionist: state.Receptionist.getInvoiceCompletedReceptionist.invoiceCompletedReceptionist,
        listPaidOrderReceptionist: state.Receptionist.getListPaidOrderReceptionist.listPaidOrderReceptionist,
        listCustomizeNumberOfItemReceptionist: state.Receptionist.postCustomizeNumberOfItemReceptionist.listCustomizeNumberOfItemReceptionist,
    };
};

export default withNamespaces()(connect(mapStateToProps)(OrderList));