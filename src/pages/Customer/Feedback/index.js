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
import left from "../../../assets/images/customer/chevron-left-o.png";
import note from "../../../assets/images/customer/notes.png";
import {Modal} from "reactstrap";

const Feedback = (props) => {
    const dispatch = useDispatch();

    const [openSendFeedback, setOpenSendFeedback] = useState(false);

    const [rateService, setRateService] = useState('Rất hài lòng');
    const [rateDish, setRateDish] = useState('Rất hài lòng');
    const [content, setContent] = useState('');

    const data = {rateService, rateDish, content};

    //const [data, setData] = useState({rateService, rateDish, content});
    const [notiFeedback, setNotiFeedback] = useState('');

    const handleSubmit = () => {
        dispatch(sendFeedbackRequest(data));
        setOpenSendFeedback(true);
        setTimeout(() => {
            props.history.push('/customer-home')
            setOpenSendFeedback(true);
        }, 2500)
    };

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div className="d-flex">
                        <div className="home-icon col-2">
                            <Link to="/customer-home">
                                <img style={{width: '22px', height: '22px'}} src={left} className="icon-button"/>
                            </Link>
                        </div>
                        <div align="center" className="menu-search col-8">
                            <div className="mt-2 mb-2">
                                <span className="avatar-title bg-light span-table">
                                    <div className="div-table">Đánh giá</div>
                                </span>
                            </div>
                        </div>
                        <div align="right" className="home-icon col-2">
                        </div>
                    </div>
                </div>
                <form>
                    <div style={{paddingTop: '60px'}}>
                        <div className="col-12">
                            <div>
                                <div align="center" className="item-name-fe"><b>Về món ăn</b></div>

                                <div align="center">
                                    <div>
                                        <label for="dish1" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                type="radio"
                                                value="Không hài lòng"
                                                id="dish1"
                                                name="dish"
                                                className="check-fe"
                                                onChange={(e) => (
                                                    setRateDish(e.target.value)
                                                )}
                                                //checked={feedbackData.rateDish === "Không hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fe"
                                                for="dish1"
                                            >
                                                <div className="fe-text">Không hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                    <br/>
                                    <div>
                                        <label for="dish2" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                type="radio"
                                                value="Hài lòng"
                                                id="dish2"
                                                name="dish"
                                                className="check-fe"
                                                onChange={(e) => (
                                                    setRateDish(e.target.value)
                                                )}
                                                //checked={feedbackData.rateDish === "Hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fe"
                                                for="dish2"
                                            >
                                                <div className="fe-text">Hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                    <br/>
                                    <div>
                                        <label for="dish3" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                defaultChecked
                                                type="radio"
                                                value="Rất hài lòng"
                                                id="dish3"
                                                name="dish"
                                                className="check-fe"
                                                onChange={(e) => (
                                                    setRateDish(e.target.value)
                                                )}
                                                //checked={feedbackData.rateDish === "Rất hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fe"
                                                for="dish3"
                                            >
                                                <div className="fe-text">Rất hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div align="left" className="col-12">
                            <div>
                                <div className="item-name-fe"><b>Về phục vụ</b></div>

                                <div align="center">
                                    <div>
                                        <label for="service1" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                type="radio"
                                                value="Không hài lòng"
                                                id="service1"
                                                name="service"
                                                className="check-fes"
                                                onChange={(e) => (
                                                    setRateService(e.target.value)
                                                )}
                                                //checked={feedbackData.rateService === "Không hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fes"
                                                for="service1"
                                            >
                                                <div className="fe-text">Không hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                    <br/>
                                    <div>
                                        <label for="service2" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                type="radio"
                                                value="Hài lòng"
                                                id="service2"
                                                name="service"
                                                className="check-fes"
                                                onChange={(e) => (
                                                    setRateService(e.target.value)
                                                )}
                                                //checked={feedbackData.rateService === "Hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fes"
                                                for="service2"
                                            >
                                                <div className="fe-text">Hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                    <br/>
                                    <div>
                                        <label for="service3" align="left" style={{width: '95%', marginBottom: 'auto', marginTop: 'auto'}}>
                                            <input
                                                defaultChecked
                                                type="radio"
                                                value="Rất hài lòng"
                                                id="service3"
                                                name="service"
                                                className="check-fes"
                                                onChange={(e) => (
                                                    setRateService(e.target.value)
                                                )}
                                                //checked={feedbackData.rateService === "Rất hài lòng"}
                                            />
                                            <div
                                                className="form-check-label-fes"
                                                for="service3"
                                            >
                                                <div className="fe-text">Rất hài lòng</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop: '50px'}} className="note-item">
                        <div style={{width: '100%'}}>

                            <div className="col-md-12" style={{width: '100%'}}>
                            <textarea
                                required
                                style={{width: '100%', backgroundColor:'#FFEFCD', border:'1px solid #FCBC3A'}}
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
                </form>
                <div className="cart">
                    <button onClick={handleSubmit} className="cart-button">
                        <div className="text-cart-button">
                            <img style={{width: '20px', height:'22px'}} src={note} className="icon-button mr-2"/>Gửi đánh giá
                        </div>
                    </button>
                </div>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openSendFeedback}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Cảm ơn góp ý của bạn !</b>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

export default Feedback;