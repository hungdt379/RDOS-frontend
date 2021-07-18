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

    const [page, setPage] = useState(1)
    const [pageComplete, setPageComplete] = useState(1)

    const [pageSize] = useState(10)

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

    return (
        <React.Fragment>
            {(role === 'r') ? (
                <div>
                    <div className="display-receptionist">
                        <Header/>
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
                                                                props.dispatch(actions.getListPaidOrderReRequest(page));
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
                                                                // onChange={event => {
                                                                //     let checked = event.target.checked;
                                                                //     setOrderState(
                                                                //         orderState.map(data => {
                                                                //             if (d.order === data.order) {
                                                                //                 data.select = checked;
                                                                //             }
                                                                //             return data;
                                                                //         })
                                                                //     );
                                                                // }}
                                                                type="checkbox"
                                                                // checked={d.select}
                                                                id={lco._id}
                                                                name={lco._id}
                                                                style={{display: 'none'}}
                                                                className="check-re-order"
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
                                                                         style={{color: lco.status == "confirmed" ? "lightcoral" : "green"}}>
                                                                        {lco.status}
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
                                                <div className="gop-hoa-don col-6 d-flex" align="left">
                                                    <a
                                                        onClick={prevPage}
                                                        style={{
                                                            marginRight: '20px',
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
                                                        className="avatar-xs">
                                                        <div
                                                            className="plus-background-color-re-noti avatar-title rounded-circle">
                                                            <img src={chevonRight}
                                                                 className="plus-icon-button-re-right"/>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="gop-hoa-don col-6" align="right"
                                                     style={{height: '60px', alignItems: 'center'}}>
                                                    <button className="button-gop-hoa-don">
                                                        <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                                    </button>
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
                                                                // onChange={event => {
                                                                //     let checked = event.target.checked;
                                                                //     setOrderState(
                                                                //         orderState.map(data => {
                                                                //             if (d.order === data.order) {
                                                                //                 data.select = checked;
                                                                //             }
                                                                //             return data;
                                                                //         })
                                                                //     );
                                                                // }}
                                                                type="checkbox"
                                                                // checked={d.select}
                                                                id={lpo._id}
                                                                name={lpo._id}
                                                                style={{display: 'none'}}
                                                                className="check-re-order"
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
                                                                         style={{color: lpo.status == "confirmed" ? "lightcoral" : "green"}}>
                                                                        {lpo.status}
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
                                                    <a
                                                        onClick={prevPageComplete}
                                                        style={{
                                                            marginRight: '20px',
                                                        }}
                                                        className="avatar-xs">
                                                        <div
                                                            className="plus-background-color-re-noti avatar-title rounded-circle">
                                                            <img src={chevonRight}
                                                                 className="plus-icon-button-re-left"/>
                                                        </div>
                                                    </a>
                                                    <a
                                                        onClick={nextPageComplete}
                                                        className="avatar-xs">
                                                        <div
                                                            className="plus-background-color-re-noti avatar-title rounded-circle">
                                                            <img src={chevonRight}
                                                                 className="plus-icon-button-re-right"/>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="gop-hoa-don col-6" align="right"
                                                     style={{height: '60px', alignItems: 'center'}}>
                                                    <button style={{backgroundColor: '#6a7187'}}
                                                            className="button-gop-hoa-don" disabled={true}>
                                                        <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div align="center" className="col-xl-6">
                                <div className="side-content">
                                    <div className="list-order-re">
                                        <b>
                                            Chi tiết Order
                                        </b>
                                    </div>
                                    {(props?.detailConfirmOrderReceptionist?.data !== undefined) ? (
                                            <div>
                                                <PerfectScrollbar className="mh-55">
                                                    <div style={{height: '80px', backgroundColor: '#F8F8FB'}}
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
                                                                style={{color: props?.detailConfirmOrderReceptionist?.data?.status == "confirmed" ? "lightcoral" : "green"}}
                                                                className='detail-order-down-re'>
                                                                {props?.detailConfirmOrderReceptionist?.data?.status}
                                                            </div>
                                                        </div>
                                                    </div>

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
                                                    <PerfectScrollbar className="mh-56">
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
                                                                                        props.dispatch(actions.postCustomizeNumberItemReRequest(props?.detailConfirmOrderReceptionist?.data?._id, it?.item_id,0))
                                                                                        setTimeout(() => {
                                                                                            props.dispatch(actions.getDetailConfirmOrderReRequest(props?.detailConfirmOrderReceptionist?.data?._id))
                                                                                            setOrderId(props?.detailConfirmOrderReceptionist?.data?._id)
                                                                                        }, 1000)
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
                                                                             color: props?.detailConfirmOrderReceptionist?.data?.status == "confirmed" ? "lightcoral" : "green",
                                                                             marginRight: '30px'
                                                                         }}>
                                                                        {props?.detailConfirmOrderReceptionist?.data?.status}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </PerfectScrollbar>
                                                </PerfectScrollbar>
                                                <div style={{height: '60px', width: '98%'}} className="d-flex">
                                                    <div align="left" className="col-2">
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
                                                            {props?.detailConfirmOrderReceptionist?.data?.total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        </div>
                                                    </div>
                                                    <div align="center" className="col-4">
                                                        {props?.detailConfirmOrderReceptionist?.data?.status === "confirmed" ? (
                                                            <div className="d-flex">
                                                                <div>
                                                                    <input style={{
                                                                        height: 50,
                                                                        width: '100%',
                                                                        borderRadius: '10px'
                                                                    }} type="text" name="voucher"
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
                                                    <div align="left" className="col-4">
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
                                                        {(props?.detailConfirmOrderReceptionist?.data?.status === "confirmed")
                                                            ? (
                                                                <button
                                                                    onClick={() => {
                                                                        props.dispatch(actions.getInvoiceCompletedOrderReRequest(props?.detailConfirmOrderReceptionist?.data?.table_id))
                                                                        setTimeout(() => {
                                                                            props.history.push('/receptionist-home')
                                                                        }, 1000)
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