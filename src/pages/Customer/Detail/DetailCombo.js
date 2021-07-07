import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect, useDispatch} from "react-redux";
import {
    addToCartRequest,
    getFoodInComboRequest,
} from "../../../store/customer/actions";
import {useParams} from "react-router";
import * as actions from "../../../store/customer/actions";

// const addMinus = [
//     {data_attr: 1},
// ];

const DetailCombo = (props) => {
    const dispatch = useDispatch();
    const {_id} = useParams();

    console.log("comboId: " + _id);

    useEffect(() => {
        dispatch(getFoodInComboRequest({_id}));
    }, []);

    // const [minusAdd, setMinusAdd] = useState(1);

    function countUP(prev_data_attr) {
        setQuantity(prev_data_attr + 1);
        setCost(props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).cost);
    }

    function countDown(prev_data_attr) {
        if (prev_data_attr > 1) {
            setQuantity(prev_data_attr - 1)
        }
        ;
        setCost(props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).cost);
    }

    const backPage = () => {
        props.history.goBack();
        dispatch(getFoodInComboRequest());
    }

    const [item_id, setItem_id] = useState(_id);
    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState('');
    const [dish_in_combo, setDish] = useState([]);
    const [cost, setCost] = useState(0);

    const [checkedState, setCheckedState] = useState([]);

    console.log("checkedStatetest: " + checkedState);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const testDish = updatedCheckedState.map(
            (currentState, index) => {
                if (currentState === true) {
                    return (props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).dish_in_combo[index].name);
                }
            },
        );
        setDish(testDish.filter(function (el) {
            return el != null;
        }));
    };

    console.log("test check: " + dish_in_combo);

    console.log("cost test: " + cost);
    console.log("noc test: " + quantity);

    const data = {item_id, quantity, note, dish_in_combo, cost};

    const handleSubmit = () => {
        dispatch(addToCartRequest(data));
        props.history.push('/customer-cart');
    };

    const [show, setShow] = useState("none");
    const [hide, setHide] = useState("block");

    const handleDetail = () => {
        setShow("block");
        setHide("none");
        setCost(props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).cost);
        setQuantity(props.authCustomer.data.user.number_of_customer);
        setCheckedState(new Array(props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).dish_in_combo.length).fill(false));
    };

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-detail">
                    <div>
                        <div className="col-2">
                            <button
                                onClick={backPage}
                                style={{height: '35px'}}>
                                <div>
                                    <b>Back</b>
                                </div>
                            </button>
                        </div>
                        <div align="center" className="menu-search col-10">
                        </div>
                    </div>
                </div>
                {props?.dataFoodInCombo?.data?.map((d, i) => (d.dish_in_combo.length !== 0) ? (
                    <div>
                        <div align="center" className="image-item">
                            <img src={d.image} alt="" height="80%" width="80%"/>
                        </div>


                        <div className="detail-item">
                            <div className="name-item">
                                <b>{(d.name)}
                                    <div>{(d.hotpot === false) ? "(được gọi thêm lẩu miễn phí)" : ""}</div>
                                </b></div>
                            <div
                                className="cost-item">Giá: {(d.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                            </div>
                        </div>
                        <div align="center" style={{display: hide}}>
                            <a onClick={handleDetail}>
                                <div>Chi tiết</div>
                                <i style={{color: "lightcoral", fontSize: '30px'}}
                                   className="bx bx-chevron-down-circle bx-tada"></i>
                            </a>
                        </div>
                        <div style={{display: show}}>
                            <div className="list-item">
                                <div className="d-flex">
                                    <div align="left" className="col-6"><b style={{marginLeft: 'calc(100% - 95%)'}}>Bao
                                        gồm:</b>
                                    </div>
                                    <div align="right" className="col-6">
                                        {/*<input*/}
                                        {/*    className="check-all-button"*/}
                                        {/*    type="checkbox"*/}
                                        {/*    onChange={e => {*/}
                                        {/*        // let checked = e.target.checked;*/}
                                        {/*        // setFoodState(*/}
                                        {/*        //     foodState.map(ch => {*/}
                                        {/*        //         ch.select = checked;*/}
                                        {/*        //         return ch;*/}
                                        {/*        //     })*/}
                                        {/*        // );*/}
                                        {/*        setCost(props?.dataFoodInCombo?.data?.find((cb) => (cb._id === _id)).cost);*/}
                                        {/*        setQuantity(props.authCustomer.data.user.number_of_customer);*/}
                                        {/*    }}*/}
                                        {/*/><b>Chọn hết</b>*/}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div align="center" className="checkbox-dish">
                                        {d?.dish_in_combo?.map((dic, index) => (
                                            <div>
                                                <label key={index}>
                                                    <input
                                                        id={dic._id}
                                                        name={dic.name}
                                                        value={dic.name}
                                                        onChange={() => {
                                                            handleOnChange(index);
                                                        }}
                                                        type="checkbox"
                                                        checked={checkedState[index]}
                                                    />{dic.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="note-item" style={{width: '50%'}}>
                                    <textarea
                                        required
                                        style={{width: '80%'}}
                                        className="introduce-profile note-input-item"
                                        type="text"
                                        rows="8"
                                        maxLength="80"
                                        placeholder="Chú thích...(VD:Ăn được cay, Không ăn được cay,...)"
                                        name="note"
                                        id="note"
                                        onChange={(e) => (
                                            setNote(e.target.value)
                                        )}
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="order-cart">
                                {checkedState.find((cs) => (cs === true)) ? (
                                    <button onClick={handleSubmit} className="order-button">
                                        <div>Thêm vào danh sách gọi món</div>
                                    </button>
                                ):(null)}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div align="center" className="image-item">
                            <img src={d.image} alt="" height="80%" width="80%"/>
                        </div>


                        <div className="detail-item">
                            <div className="name-item"><b>{(d.name)}</b></div>
                            <div
                                className="cost-item">Giá: {(d.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                            </div>
                        </div>
                        <div align='center' className="note-item" style={{width: '100%'}}>
                                <textarea
                                    style={{width: '80%'}}
                                    className="introduce-profile note-input-item"
                                    type="text"
                                    rows="8"
                                    maxLength="80"
                                    placeholder="Chú thích..."
                                    name="note"
                                    id="note"
                                    onChange={(e) => (
                                        setNote(e.target.value)
                                    )}
                                ></textarea>
                        </div>
                        <div className="d-flex order-drink">
                            <div align="left" className="col-4 add-minus">
                                <button className="add-btn" onClick={() => {
                                    countDown(quantity)
                                }}>
                                    <div><i style={{color: "#000000"}} className="bx bx-minus bx-tada"></i>
                                    </div>
                                </button>
                                <b style={{color: '#000000'}}> {quantity} </b>
                                <button className="add-btn" onClick={() => {
                                    countUP(quantity)
                                }}>
                                    <div><i style={{color: "#000000"}} className="bx bx-plus bx-tada"></i></div>
                                </button>
                            </div>
                            <div align="right" className="col-8">
                                {(quantity > 0) ? (
                                    <button onClick={handleSubmit} className="order-button-drink">
                                        <div>Thêm vào danh sách gọi món</div>
                                    </button>
                                ):(null)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const {authCustomer} = state.LoginCustomer;
    return {
        authCustomer,
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataFoodInCombo: state.Customer.getFoodInCombo.dataFoodInCombo,
    };
};

export default withNamespaces()(connect(mapStateToProps)(DetailCombo));