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

function Feedback() {

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

                <div style={{paddingTop: '100px'}}>
                    <div align="left" className="col-10">
                        <div className="item-name"><b>Về món ăn</b></div>
                        <div style={{paddingTop: '5px'}} className="item-cost">
                            <div><input type="radio" value="Không hài lòng" name="dish"/> Không hài lòng</div>
                            <div><input type="radio" value="Hài lòng" name="dish"/> Hài lòng</div>
                            <div><input type="radio" value="Rất hài lòng" name="dish"/> Rất hài lòng</div>
                        </div>
                    </div>
                </div>

                <div style={{paddingTop: '30px'}}>
                    <div align="left" className="col-10">
                        <div className="item-name"><b>Về phục vụ</b></div>
                        <div style={{paddingTop: '5px'}} className="item-cost">
                            <div><input type="radio" value="Không hài lòng" name="service"/> Không hài lòng</div>
                            <div><input type="radio" value="Hài lòng" name="service"/> Hài lòng</div>
                            <div><input type="radio" value="Rất hài lòng" name="service"/> Rất hài lòng</div>
                        </div>
                    </div>
                </div>

                <div style={{marginTop: '50px'}} className="note-item">
                    <input style={{height: '100px'}} className="note-input-item" type="text" name="search"
                           placeholder="Note..."/>
                </div>
                <div className="order-cart">
                    <Link to="/customer-home">
                        <button style={{width: '100%'}} className="order-button">
                            <div>Gửi đánh giá</div>
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

export default Feedback;