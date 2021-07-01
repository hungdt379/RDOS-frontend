import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect, useDispatch} from "react-redux";
import {getFoodInComboRequest} from "../../../store/customer/actions";
import {useParams} from "react-router";

const addMinus = [
    {data_attr: 1},
];

const DetailCombo = (props) => {
    const dispatch = useDispatch();
    const {_id} = useParams();

    console.log("comboId: " + _id);

    const [foodState, setFoodState] = useState();

    useEffect(() => {
        dispatch(getFoodInComboRequest({_id}));
    }, []);


    const [minusAdd, setMinusAdd] = useState(addMinus);

    function countUP(prev_data_attr) {
        setMinusAdd(minusAdd.map(p => ({...p, data_attr: prev_data_attr + 1})));
    }

    function countDown(prev_data_attr) {
        if (prev_data_attr > 1) {
            setMinusAdd(minusAdd.map(p => ({...p, data_attr: prev_data_attr - 1})))
        }
        ;
    }

    const backPage = () => {
        props.history.goBack();
        dispatch(getFoodInComboRequest());
    }

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
                        <div className="list-item">
                            <div className="d-flex">
                                <div align="left" className="col-6"><b style={{marginLeft: 'calc(100% - 95%)'}}>Bao
                                    gồm:</b>
                                </div>
                                <div align="right" className="col-6">
                                    <input
                                        className="check-all-button"
                                        type="checkbox"
                                        onChange={e => {
                                            let checked = e.target.checked;
                                            setFoodState(
                                                foodState.map(ch => {
                                                    ch.select = checked;
                                                    return ch;
                                                })
                                            );
                                        }}
                                    /><b>Chọn hết</b>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div align="center" className="checkbox-dish">
                                    {d?.dish_in_combo?.map((dic, i) => (
                                        <div>
                                            <label key={dic._id}>
                                                <input
                                                    onChange={event => {
                                                        let checked = event.target.checked;
                                                        setFoodState(
                                                            foodState.map(data => {
                                                                if (dic._id === data._id) {
                                                                    data.select = checked;
                                                                }
                                                                return data;
                                                            })
                                                        );
                                                    }}
                                                    type="checkbox"
                                                    checked={dic.select}
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
                                        placeholder="Chú thích..."
                                        name="content"
                                        id="content"
                                        // onChange={(e) => (
                                        //     setContent(e.target.value)
                                        // )}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="order-cart">
                            <Link to="/customer-cart">
                                <button className="order-button">
                                    <div>Thêm vào danh sách gọi món</div>
                                </button>
                            </Link>
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
                        <div className="d-flex order-drink">
                            {
                                minusAdd.map((pr) =>
                                    <div align="left" className="col-4 add-minus">
                                        <button className="add-btn" onClick={() => {
                                            countDown(pr.data_attr)
                                        }}>
                                            <div><i style={{color: "#000000"}} className="bx bx-minus bx-tada"></i>
                                            </div>
                                        </button>
                                        <b style={{color: '#000000'}}> {pr.data_attr} </b>
                                        <button className="add-btn" onClick={() => {
                                            countUP(pr.data_attr)
                                        }}>
                                            <div><i style={{color: "#000000"}} className="bx bx-plus bx-tada"></i></div>
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
    return {
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataFoodInCombo: state.Customer.getFoodInCombo.dataFoodInCombo,
    };
};

export default withNamespaces()(connect(mapStateToProps)(DetailCombo));