import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import {useDispatch} from "react-redux";

const addMinus = [
    {data_attr: 1},
];

const DetailDrink = (props) => {

    const [minusAdd, setMinusAdd] = useState(addMinus);

    function countUP(prev_data_attr) {
        setMinusAdd(minusAdd.map(p => ({...p, data_attr: prev_data_attr + 1})));
    }

    function countDown(prev_data_attr) {
        if(prev_data_attr > 1){
            setMinusAdd(minusAdd.map(p => ({...p, data_attr: prev_data_attr - 1})))
        };
    }

    return (
        <React.Fragment>
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
                <div className="name-item"><b>Coca</b></div>
                <div className="cost-item">Giá: 10.000 vnd</div>
            </div>

            <div className="d-flex order-drink">
                {
                    minusAdd.map((pr) =>
                        <div align="left" className="col-4 add-minus">
                            <button className="add-btn" onClick={() => {
                                countDown(pr.data_attr)
                            }}>
                                <div>-</div>
                            </button>
                            <b style={{color: '#000000'}}> {pr.data_attr} </b>
                            <button className="add-btn" onClick={() => {
                                countUP(pr.data_attr)
                            }}>
                                <div>+</div>
                            </button>
                        </div>
                    )
                }
                <div align="right" className="col-8">
                    <Link to="/customer-cart">
                        <button className="order-button-drink">
                            <div>Thêm vào danh sách gọi món</div>
                        </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailDrink;