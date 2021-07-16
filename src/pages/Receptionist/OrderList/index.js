import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Col, Container, Row} from "reactstrap/es";
import Invalid from "../../Customer/Invalid";
import NotFound from "../../Authentication/Page401";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import Footer from "../../../components/RdosCustomerLayout/Footer";

// Import menuDropdown

function OrderList() {

    let statusState = [
        {id: 's1', code: "confirm", name: "Đã confirm"},
        {id: 's2', code: "paid", name: "Đã thanh toán"}
    ];

    const [displayStatus, setStatus] = useState("confirm");

    const [orderState, setOrderState] = useState([]);
    const [itemState, setItemState] = useState([]);

    useEffect(() => {
        let orderState = [
            {order: 123, table: "MB01", status: "confirm"},
            {order: 124, table: "MB02", status: "confirm"},
            {order: 125, table: "MB03", status: "confirm"},
            {order: 126, table: "MB04", status: "confirm"},
            {order: 127, table: "MB05", status: "confirm"},
            {order: 128, table: "MB06", status: "confirm"},
            {order: 129, table: "MB07", status: "confirm"},
            {order: 122, table: "MB05", status: "paid"},
            {order: 121, table: "MB06", status: "paid"},
            {order: 120, table: "MB07", status: "paid"},
            {order: 133, table: "MB01", status: "paid"},
            {order: 132, table: "MB05", status: "confirm"},
            {order: 131, table: "MB06", status: "confirm"},
            {order: 130, table: "MB07", status: "confirm"},
            {order: 143, table: "MB01", status: "confirm"},
            {order: 144, table: "MB02", status: "confirm"},
            {order: 145, table: "MB03", status: "confirm"},
            {order: 146, table: "MB04", status: "confirm"},
            {order: 147, table: "MB05", status: "confirm"},
            {order: 148, table: "MB06", status: "confirm"},
            {order: 149, table: "MB07", status: "confirm"},
            {order: 142, table: "MB05", status: "paid"},
            {order: 141, table: "MB06", status: "paid"},
            {order: 140, table: "MB07", status: "paid"},
        ];

        let itemState = [
            {
                id: 1,
                order: 123,
                item: 'Combo 129',
                price: 129000,
                table: "MB01",
                number: 2,
                type: "combo",
                status: "complete"
            },
            {
                id: 2,
                order: 123,
                item: 'Ngô chiên',
                price: 40000,
                table: "MB02",
                number: 5,
                type: "extra",
                status: "complete"
            },
            {
                id: 3,
                order: 123,
                item: 'Coca',
                price: 10000,
                table: "MB03",
                number: 4,
                type: "drink",
                status: "in process"
            },
            {
                id: 4,
                order: 124,
                item: 'Combo 169',
                price: 169000,
                table: "MB01",
                number: 2,
                type: "combo",
                status: "complete"
            },
            {
                id: 5,
                order: 124,
                item: 'Ngô ',
                price: 30000,
                table: "MB02",
                number: 5,
                type: "extra",
                status: "complete"
            },
            {
                id: 6,
                order: 124,
                item: 'Fanta',
                price: 10000,
                table: "MB03",
                number: 4,
                type: "drink",
                status: "complete"
            },
            {
                id: 7,
                order: 122,
                item: 'Combo 209',
                price: 209000,
                table: "MB01",
                number: 2,
                type: "combo",
                status: "complete"
            },
            {
                id: 8,
                order: 122,
                item: 'Ngô chiên',
                price: 40000,
                table: "MB02",
                number: 5,
                type: "extra",
                status: "complete"
            },
            {
                id: 9,
                order: 122,
                item: 'Sprie',
                price: 10000,
                table: "MB03",
                number: 4,
                type: "drink",
                status: "complete"
            },
        ];

        setOrderState(
            orderState.map(d => {
                return {
                    select: false,
                    order: d.order,
                    table: d.table,
                    status: d.status,
                };
            })
        );

        setItemState(
            itemState.map(it => {
                return {
                    select: false,
                    order: it.order,
                    item: it.item,
                    price: it.price,
                    table: it.table,
                    number: it.number,
                    type: it.type,
                    status: it.status,
                };
            })
        );
        console.log('a :' + orderState.map((d, i) => (itemState.map((it, i) => (it.order == d.order)))));

    }, []);

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
    }, []);

    console.log('role :' + role);

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
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        /> <b className="input-status-re">{result.name}</b>
                                                        <div for={result.id} className="line-color"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <PerfectScrollbar className="mh-55">
                                        {orderState.map((d, i) => (d.status == displayStatus) ? (
                                                <div>
                                                    <label className="item-menu-re d-flex">
                                                        <input
                                                            onChange={event => {
                                                                let checked = event.target.checked;
                                                                setOrderState(
                                                                    orderState.map(data => {
                                                                        if (d.order === data.order) {
                                                                            data.select = checked;
                                                                        }
                                                                        return data;
                                                                    })
                                                                );
                                                            }}
                                                            type="checkbox"
                                                            checked={d.select}
                                                            id={d.order}
                                                            name={d.order}
                                                            style={{display: 'none'}}
                                                            className="check-re-order"
                                                        />
                                                        <div htmlFor={d.order}
                                                             className="col-11 d-flex menu-item-bar-re">
                                                            <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                                 align="left" className="col-11 d-flex">
                                                                <div align="center" className="col-4 item-cost-re">
                                                                    <b>{d.order}</b>
                                                                </div>
                                                                <div align="center" className="col-4 item-cost-re">
                                                                    <b>{d.table}</b>
                                                                </div>
                                                                <div align="center" className="col-4 item-name-re"
                                                                     style={{color: d.status == "confirm" ? "lightcoral" : "green"}}>
                                                                    {d.status}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="add-button-re col-1">
                                                            <Link>
                                                                <a onClick={(e) => (window.location.pathname = '/receptionist-home/' + d.order)}
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
                                            )
                                            : (null)
                                        )}
                                    </PerfectScrollbar>
                                    <div className="gop-hoa-don" align="right"
                                         style={{height: '60px', alignItems: 'center'}}>
                                        <button className="button-gop-hoa-don">
                                            <b className="text-gop-hoa-don">Gộp hóa đơn</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div align="center" className="col-xl-6">
                                <div className="side-content">
                                    <div className="list-order-re">
                                        <b>
                                            Chi tiết Order
                                        </b>
                                    </div>
                                    {orderState.map((d, i) => ("/receptionist-home/" + d.order == window.location.pathname) ? (
                                            <div>
                                                <div style={{height: '80px', backgroundColor: '#F8F8FB'}}
                                                     className="ra-button-re d-flex">
                                                    <div align="center" className="col-4 detail-order-re">
                                                        <div className='detail-order-top-re'>Mã Order</div>
                                                        <div className='detail-order-down-re'>{d.order}</div>
                                                    </div>
                                                    <div align="center" className="col-4 detail-order-re">
                                                        <div className='detail-order-top-re'>Mã Bàn</div>
                                                        <div className='detail-order-down-re'>{d.table}</div>
                                                    </div>
                                                    <div align="center" className="col-4 detail-order-re">
                                                        <div className='detail-order-top-re'>Trạng thái</div>
                                                        <div style={{color: d.status == "confirm" ? "lightcoral" : "green"}}
                                                             className='detail-order-down-re'>
                                                            {d.status}
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    {itemState.map((it, i) => (it.order == d.order) ? (
                                                            <div className="card-order d-flex">
                                                                <div align="left"
                                                                     className="col-3 card-detail-order-text-child">
                                                                    <div>{it.item}</div>
                                                                </div>
                                                                <div align="left"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    <div>{it.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                                </div>
                                                                <div style={{paddingLeft: '0px'}} align="center"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    <div>{it.number}</div>
                                                                </div>
                                                                <div align="right"
                                                                     className="col-2 card-detail-order-text-child">
                                                                    <b>{(it.number * it.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
                                                                </div>
                                                                <div style={{marginRight: '30px'}} align="right"
                                                                     className="col-3 card-detail-order-text-child"
                                                                     style={{color: it.status == "in process" ? "lightcoral" : "green"}}>
                                                                    {it.status}
                                                                </div>
                                                            </div>
                                                        )
                                                        : (null)
                                                    )}
                                                </PerfectScrollbar>
                                                <div style={{height: '60px', width: '98%'}} className="d-flex">
                                                    <div align="left" className="col-4">
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
                                                            {itemState.filter((it) => (it.order == d.order)).reduce((total, pr) => total + pr.price * pr.number, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        </div>
                                                    </div>
                                                    <div align="left" className="col-5">
                                                        <div>
                                                            <textarea style={{
                                                                height: 50,
                                                                width: '100%',
                                                                borderRadius: '10px'
                                                            }}>
                                                                Khách còn để lại 2 coca
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3">
                                                        {(itemState.filter((it) => (it.order == d.order)).every(it => it.status == "complete" && d.status == "confirm") === true)
                                                            ? (
                                                                <Link to="/receptionist-home">
                                                                    <button style={{
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
                                                                </Link>
                                                            )
                                                            : (
                                                                <button disabled={true} style={{
                                                                    backgroundColor: '#F8F8FB',
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
                                        : (null)
                                    )}
                                    {(window.location.pathname == '/receptionist-home') ?
                                        (
                                            <div style={{fontSize: '20px'}}>Hãy chọn 1 Order để xem
                                                chi
                                                tiết</div>
                                        ) : (null)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            ) : (<NotFound/>)}
        </React.Fragment>
    );
}

export default OrderList;