import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";

// const dish = [
//     "Ba chỉ bò",
//     "Ba chỉ lợn",
//     "Xúc xích",
//     "Sụn",
//     "Bắp bò",
//     "Kim chi",
//     "Rau củ quả",
// ];

function DetailCombo() {

    const [studentState, setStudentState] = useState([]);

    useEffect(() => {
        let studentState = [
            {id: 1, name: "Ba chỉ bò"},
            {id: 2, name: "Ba chỉ lợn"},
            {id: 3, name: "Xúc xích"},
            {id: 4, name: "Sụn"},
            {id: 5, name: "Bắp bò"},
            {id: 6, name: "Kim chi"},
            {id: 7, name: "Rau củ quả"}
        ];

        setStudentState(
            studentState.map(d => {
                return {
                    select: false,
                    id: d.id,
                    name: d.name
                };
            })
        );
    }, []);
    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-detail">
                    <div>
                        <div className="col-2">
                            <Link to="/customer-menu">
                                <button style={{height: '35px'}}>
                                    <div>
                                        <b>Back</b>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div align="center" className="menu-search col-10">
                        </div>
                    </div>
                </div>

                <div align="center" className="image-item">
                    <img src={imageItem} alt="" height="auto" width="auto"/>
                </div>

                <div className="detail-item">
                    <div className="name-item"><b>Combo Nướng 129</b></div>
                    <div className="cost-item">Giá: 129.000 vnd</div>
                </div>

                <div className="list-item">
                    <div className="d-flex">
                        <div align="left" className="col-6"><b style={{marginLeft: 'calc(100% - 95%)'}}>Bao gồm:</b>
                        </div>
                        <div align="right" className="col-6">
                            <input
                                className="check-all-button"
                                type="checkbox"
                                onChange={e => {
                                    let checked = e.target.checked;
                                    setStudentState(
                                        studentState.map(d => {
                                            d.select = checked;
                                            return d;
                                        })
                                    );
                                }}
                            /><b>Chọn hết</b>
                        </div>
                    </div>
                    <div align="center" className="checkbox-dish">
                        {studentState.map((d, i) => (
                            <div>
                                <label key={d.id}>
                                    <input
                                        onChange={event => {
                                            let checked = event.target.checked;
                                            setStudentState(
                                                studentState.map(data => {
                                                    if (d.id === data.id) {
                                                        data.select = checked;
                                                    }
                                                    return data;
                                                })
                                            );
                                        }}
                                        type="checkbox"
                                        checked={d.select}
                                    />{d.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="note-item">
                    <input className="note-input-item" type="text" name="search" placeholder="Note..."/>
                </div>
                <div className="order-cart">
                    <Link to="/customer-cart">
                        <button className="order-button">
                            <div>Thêm vào danh sách gọi món</div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

export default DetailCombo;