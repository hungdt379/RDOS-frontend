import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import Invalid from "../Invalid";
import {Button, Input, Label} from "reactstrap/es";
import {sendFeedbackRequest} from "../../../store/customer/actions";
import {useDispatch} from "react-redux";
import * as actions from "../../../store/customer/actions";

const Feedback = (props) => {
    const dispatch = useDispatch();

    const [rateService, setRateService] = useState('Rất hài lòng');
    const [rateDish, setRateDish] = useState('Rất hài lòng');
    const [content, setContent] = useState('');

    const data = {rateService, rateDish, content};

    //const [data, setData] = useState({rateService, rateDish, content});
    const [notiFeedback, setNotiFeedback] = useState('');

    const handleSubmit = () => {
        dispatch(sendFeedbackRequest(data));
        alert("Đã gửi feedback đến nhà hàng!");
        setNotiFeedback('Đã gửi feedback đến nhà hàng!');
    };

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-detail">
                    <div className="d-flex">
                        <div className="col-2">
                            <Link to="/customer-home">
                                <button style={{height: '35px'}}>
                                    <div>
                                        <b>Back</b>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div align="center" className="col-8">
                            <b>Đánh giá</b>
                        </div>
                        <div align="center" className="menu-search col-2">
                        </div>
                    </div>
                </div>

                <form>
                    <div style={{paddingTop: '100px'}}>
                        <div align="left" className="col-10">
                            <div className="form-group row">
                                <label
                                    htmlFor="example-tel-input"
                                    className="col-md-3 col-form-label"
                                >
                                    <div className="item-name"><b>Về món ăn: </b></div>
                                </label>

                                <div className="col-md-9">
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="Không hài lòng"
                                            id="dish1"
                                            name="dish"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateDish(e.target.value)
                                            )}
                                            //checked={feedbackData.rateDish === "Không hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="dish1"
                                        >
                                            Không hài lòng
                                        </Label>
                                    </div>
                                    <br/>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="Hài lòng"
                                            id="dish2"
                                            name="dish"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateDish(e.target.value)
                                            )}
                                            //checked={feedbackData.rateDish === "Hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="dish2"
                                        >
                                            Hài lòng
                                        </Label>
                                    </div>
                                    <br/>
                                    <div className="form-check form-check-inline">
                                        <input
                                            defaultChecked
                                            type="radio"
                                            value="Rất hài lòng"
                                            id="dish3"
                                            name="dish"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateDish(e.target.value)
                                            )}
                                            //checked={feedbackData.rateDish === "Rất hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="dish3"
                                        >
                                            Rất hài lòng
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div align="left" className="col-10">
                            <div className="form-group row">
                                <label
                                    htmlFor="example-tel-input"
                                    className="col-md-3 col-form-label"
                                >
                                    <div className="item-name"><b>Về phục vụ: </b></div>
                                </label>

                                <div className="col-md-9">
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="Không hài lòng"
                                            id="service1"
                                            name="service"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateService(e.target.value)
                                            )}
                                            //checked={feedbackData.rateService === "Không hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="service1"
                                        >
                                            Không hài lòng
                                        </Label>
                                    </div>
                                    <br/>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="Hài lòng"
                                            id="service2"
                                            name="service"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateService(e.target.value)
                                            )}
                                            //checked={feedbackData.rateService === "Hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="service2"
                                        >
                                            Hài lòng
                                        </Label>
                                    </div>
                                    <br/>
                                    <div className="form-check form-check-inline">
                                        <input
                                            defaultChecked
                                            type="radio"
                                            value="Rất hài lòng"
                                            id="service3"
                                            name="service"
                                            className="form-check-input"
                                            onChange={(e) => (
                                                setRateService(e.target.value)
                                            )}
                                            //checked={feedbackData.rateService === "Rất hài lòng"}
                                        />
                                        <Label
                                            className="form-check-label"
                                            htmlFor="service3"
                                        >
                                            Rất hài lòng
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop: '50px'}} className="note-item">
                        <div style={{width: '100%'}}>
                            <label
                                htmlFor="example-tel-input"
                                className="col-md-12 col-form-label"
                            >
                                <div className="item-name"><b>Góp ý : </b></div>
                            </label>

                            <div className="col-md-12" style={{width: '100%'}}>
                            <textarea
                                required
                                style={{width: '100%'}}
                                className="introduce-profile"
                                type="text"
                                rows="6"
                                maxLength="100"
                                placeholder="Góp y của bạn về chất lượng nhà hàng !"
                                name="content"
                                id="content"
                                onChange={(e) => (
                                    setContent(e.target.value)
                                )}
                            ></textarea>
                            </div>
                        </div>
                    </div>
                    <div style={{display: (notiFeedback === '') ? 'none' : 'block', marginBottom: '100px'}}
                         align="center"><i style={{color: "green", fontSize: '20px'}}
                                           className="bx bx-calendar-check bx-tada"></i><b
                        style={{color: 'green', fontSize: '15px'}}>{notiFeedback}</b></div>
                    <div className="order-cart">
                        <Button onClick={handleSubmit} style={{width: '100%'}} className="order-button">
                            <div>Gửi đánh giá</div>
                        </Button>
                    </div>
                </form>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

export default Feedback;