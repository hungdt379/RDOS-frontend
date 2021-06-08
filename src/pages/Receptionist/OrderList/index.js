import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Col, Container, Row} from "reactstrap/es";
import Invalid from "../../Customer/Invalid";

// Import menuDropdown

function OrderList() {

    let statusState = [
        {code: "confirm", name: "Đã confirm"},
        {code: "paid", name: "Đã thanh toán"}
    ];

    const [displayStatus, setStatus] = useState("confirm");

    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        console.log('a :' + window.location.pathname);
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
    }, []);

    return (
        <React.Fragment>
            <div className="display-receptionist">
                <Header/>
                <div align="center" className="d-flex receptionist-order">
                    <div align="center" className="col-6">
                        <div className="side-content">
                            <div style={{height: '30px'}}><b style={{fontSize: '25px'}}>Danh sách order</b></div>
                            <div style={{height: '30px'}} className="d-flex">
                                {statusState.map(result => (
                                    <div align="center" className="col-6">
                                        <label style={{fontSize: '20px'}}>
                                            <input
                                                type="radio"
                                                value={result.code}
                                                name="statusValue"
                                                checked={displayStatus === result.code}
                                                onChange={(e) => setStatus(e.target.value)}
                                            /> {result.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <PerfectScrollbar className="mh-55">
                                {orderState.map((d, i) => (d.status == displayStatus) ? (
                                        <div className="card-order d-flex">
                                            <div className="col-1">
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
                                                />
                                            </div>
                                            <div className="col-3">
                                                <b>{d.order}</b>
                                            </div>
                                            <div className="col-3">
                                                <b>{d.table}</b>
                                            </div>
                                            <div className="col-3" style={{color:d.status=="confirm" ? "lightcoral" : "green"}}>
                                                {d.status}
                                            </div>
                                            <div className="col-2">
                                                <Link>
                                                    <button
                                                        className="card-order-button"
                                                        onClick={(e) => (window.location.pathname='/receptionist-home/'+d.order)}
                                                    >
                                                        <div>
                                                            <b>Chi tiết</b>
                                                        </div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                    : (null)
                                )}
                            </PerfectScrollbar>
                            <div align="right" style={{height: '60px', width:'80%', alignItems:'center'}}>
                                <button>
                                    <b>Gộp hóa đơn</b>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div align="center" className="col-6">
                        <div className="side-content">
                            <div style={{height: '30px'}}><b style={{fontSize: '25px'}}>Chi tiết order</b></div>

                            <PerfectScrollbar className="mh-55">

                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
            <div none-display-receptionist>
                <Invalid/>
            </div>
        </React.Fragment>
    );
}

export default OrderList;