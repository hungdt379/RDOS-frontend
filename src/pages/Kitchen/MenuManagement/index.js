import React, {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import Header from "../../Kitchen/HeaderKitchen";

function KitchenMenu(){

    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        console.log('a :' + window.location.pathname);
        let orderState = [
            {stt: 1, itemID: "0001", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Còn Hàng" },
            {stt: 2, itemID: "0002", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Hết Hàng" },
            {stt: 3, itemID: "0003", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Còn Hàng" },
            {stt: 4, itemID: "0004", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Hết Hàng" },
            {stt: 5, itemID: "0005", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Còn Hàng"},
            {stt: 6, itemID: "0006", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Hết Hàng" },
            {stt: 7, itemID: "0007", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Hết Hàng" },
            {stt: 8, itemID: "0008", name: "tên món ăn" , image: "image", detail:"Chi tiết món ăn", price:"1000.000vnd",status:"Còn Hàng" },
        ];
        setOrderState(
            orderState.map(d => {
                return {
                    select: false,
                    stt: d.stt,
                    itemID: d.itemID,
                    name: d.name,
                    image: d.image,
                    detail: d.detail,
                    price: d.price,
                    status: d.status
                };
            })
        );
    }, []);

    return(
        <React.Fragment>
            <div className="display-receptionist">
                <Header/>
                <div align="center" className="d-flex receptionist-order">
                    <div align="center" className="col-12">
                        <div style={{height: '30px'}}><b style={{fontSize: '25px'}}>Menu</b></div>
                        <div className="side-content">
                            <div id="search-form">
                               <input type="text" id="fn-search"
                                                                  style={{marginLeft: "20px",marginTop: "30px", width: "50%"}}
                                                                  placeholder="Nhập Món Cần Tìm"/>
                                <input type="button"  style={{marginLeft: "30px", padding:"0 10px"}}
                                       onClick="load()" value="Tìm Kiếm"
                                       />
                            </div>
                            <PerfectScrollbar className="mh-55">
                            <table style={{marginLeft:"40px",width:"95%"}} className="table">
                                <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã Món</th>
                                    <th scope="col">Tên Món</th>
                                    <th scope="col">Hình Ảnh</th>
                                    <th scope="col">Chi Tiết</th>
                                    <th scope="col">Giá Bán</th>
                                    <th scope="col">Trạng Thái</th>
                                </tr>
                                </thead>
                                <tbody>

                                    {orderState.map((d, i) =>
                                            <tr>
                                                <th scope="row">{d.stt}</th>
                                                <td>{d.itemID}</td>
                                                <td>{d.name}</td>
                                                <td>{d.image}</td>
                                                <td>{d.detail}</td>
                                                <td>{d.price}</td>
                                                <td> <button>
                                                    <div>
                                                        <b>{d.status}</b>
                                                    </div>
                                                </button></td>
                                            </tr>
                                    )}

                                </tbody>
                            </table>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default KitchenMenu;