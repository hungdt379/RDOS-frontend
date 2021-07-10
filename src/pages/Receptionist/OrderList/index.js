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
                                                                        className="plus-background-color-re avatar-title rounded-circle mt-2">
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
                                    <div align="right" style={{height: '60px', width: '80%', alignItems: 'center'}}>
                                        <button>
                                            <b>Gộp hóa đơn</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div align="center" className="col-xl-6">
                                <div className="side-content">
                                    <div style={{height: '30px'}}><b style={{fontSize: '20px'}}>Chi tiết order</b></div>
                                    {orderState.map((d, i) => ("/receptionist-home/" + d.order == window.location.pathname) ? (
                                            <div>
                                                <div style={{height: '30px'}} className="d-flex">
                                                    <div align="center" className="col-4">
                                                        <label>
                                                            <b>Mã Order: </b>{d.order}
                                                        </label>
                                                    </div>
                                                    <div align="center" className="col-4">
                                                        <label>
                                                            <b>Mã bàn: </b>{d.table}
                                                        </label>
                                                    </div>
                                                    <div align="center" className="col-4">
                                                        <label>
                                                            <b>Trạng thái: </b>
                                                            <label className="col-3"
                                                                   style={{color: d.status == "confirm" ? "lightcoral" : "green"}}>
                                                                {d.status}
                                                            </label>
                                                        </label>
                                                    </div>
                                                </div>
                                                <PerfectScrollbar className="mh-55">
                                                    {itemState.map((it, i) => (it.order == d.order) ? (
                                                            <div className="card-order d-flex">
                                                                <div className="col-3">
                                                                    <b>{it.item}</b>
                                                                </div>
                                                                <div className="col-1">
                                                                    <b>{it.number}</b>
                                                                </div>
                                                                <div className="col-5">
                                                                    <b>{it.price}x{it.number}={it.number * it.price}</b>
                                                                </div>
                                                                <div className="col-3"
                                                                     style={{color: it.status == "in process" ? "lightcoral" : "green"}}>
                                                                    {it.status}
                                                                </div>
                                                            </div>
                                                        )
                                                        : (null)
                                                    )}
                                                </PerfectScrollbar>
                                                <div style={{height: '60px'}} className="d-flex">
                                                    <div align="center" className="col-6">
                                                        <div>Tổng
                                                            tiền: {itemState.filter((it) => (it.order == d.order)).reduce((total, pr) => total + pr.price * pr.number, 0)}</div>
                                                        <div>
                                                            <textarea style={{height: 50, width: 'auto'}}>
                                                                Khách còn để lại 2 coca
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                    <div align="center" className="col-6">
                                                        {(itemState.filter((it) => (it.order == d.order)).every(it => it.status == "complete" && d.status == "confirm") === true)
                                                            ? (
                                                                <Link to="/receptionist-home">
                                                                    <button style={{backgroundColor: 'green'}}>
                                                                        <b>Xuất hóa đơn</b>
                                                                    </button>
                                                                </Link>
                                                            )
                                                            : (
                                                                <button disabled={true}>
                                                                    <b>Xuất hóa đơn</b>
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
                                            <div style={{fontSize: '25px', color: 'lightcoral'}}>Hãy chọn 1 Order để xem
                                                chi
                                                tiết</div>
                                        ) : (null)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<NotFound/>)}
        </React.Fragment>
    );
}

export default OrderList;