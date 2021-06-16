import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import Header from "../../Kitchen/HeaderKitchen";
import NotFound from "../../Authentication/Page401";

function OrderList() {


    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        console.log('a :' + window.location.pathname);
        let orderState = [
            {order: 123, table: "MB01", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB02", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB03", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB04", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB05", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB06", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB07", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB08", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB09", name: "tên món ăn" , quantity: "số lượng" },
            {order: 123, table: "MB010", name: "tên món ăn" , quantity: "số lượng" },

        ];
        setOrderState(
            orderState.map(d => {
                return {
                    select: false,
                    order: d.order,
                    table: d.table,
                    name: d.name,
                    quantity: d.quantity
                };
            })
        );
    }, []);

    const [role, setrole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
    }, []);

    console.log('role :' + role);

    return(
        <React.Fragment>
            {(role === 'k') ? (
                <div className="display-receptionist">
                    <Header/>
                    <div align="center" className="d-flex receptionist-order">
                        <div align="center" className="col-12">
                            <div className="side-content">
                                <div style={{height: '30px'}}><b style={{fontSize: '25px'}}>Danh sách order</b></div>
                                <PerfectScrollbar className="mh-55">
                                    {orderState.map((d, i) =>
                                        <div className="card-order d-flex">
                                            <div className="col-2">
                                                <b>{d.order}</b>
                                            </div>
                                            <div className="col-2">
                                                <b>{d.table}</b>
                                            </div>
                                            <div className="col-2">
                                                {d.name}
                                            </div>
                                            <div className="col-2">
                                                {d.quantity}
                                            </div>
                                            <div className="col-2">
                                                <button  className="card-order-button">
                                                    <div>
                                                        <b>Status</b>
                                                    </div>
                                                </button>
                                            </div>

                                            <div className="col-2">
                                                <button>
                                                    <div>
                                                        <b>Chi tiết</b>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                    )}
                                </PerfectScrollbar>

                            </div>
                        </div>
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    );
}

export default OrderList;