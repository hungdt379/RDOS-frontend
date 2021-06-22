import React, {useState} from "react";

import {Link} from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
//Import scss
import "../../../assets/scss/custom/pages/customer/home.scss";
import "../../../assets/scss/custom/pages/customer/screen.scss";
import CallWaiter from "../CallWaiter";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";

const CustomerHome = (props) => {
    //const {tog_standard} = props;
    const [openCall, setOpenCall] = useState(false);
    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="v4_1">
                    <div className="d-flex header-home">
                        <div align="left" className="system col-6">RDOS</div>
                        <div align="right" className="table-code col-6">{props.authCustomer.data.user.user_name}</div>
                    </div>

                    <div align='center' className="info">
                        <div className="v56_0">XIN CHÀO QUÝ KHÁCH</div>
                        <div className="v56_1">Rất hân hạnh được phục vụ Quý Khách</div>
                    </div>

                    <Link to="/customer-menu">
                        <button className="menu-button d-flex">
                            <div align="left" className="icon col-4">(icon)</div>
                            <div align="right" className="text-button col-8">Xem Menu - Gọi món</div>
                        </button>
                    </Link>

                    <div className="d-flex">
                        <Link align="center" className="square-button">
                            <button style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Gọi thanh toán</div>
                            </button>
                        </Link>
                        <Link align="center" className="square-button">
                            <button
                                onClick={() => {
                                    setOpenCall(true)
                                }}
                                style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Gọi phục vụ</div>
                            </button>
                        </Link>
                        <Link align="center" className="square-button" to="/customer-feedback">
                            <button style={{backgroundColor: '#50a5f1', borderRadius: '10px', width: '100%'}}>
                                <div className="square-icon">(icon)</div>
                                <div className="square-text-button">Đánh giá</div>
                            </button>
                        </Link>
                    </div>

                    <Link to="/customer-see-order">
                        <button className="menu-button d-flex">
                            <div align="left" className="icon col-4">(icon)</div>
                            <div align="right" className="text-button col-8">Xem Order</div>
                        </button>
                    </Link>


                </div>
                <div style={{backgroundColor: '#6a7187', bottom:'60px'}}>
                    <CallWaiter
                        open={openCall}
                        onClose={() => setOpenCall(false)}
                    />
                </div>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
};

const mapStatetoProps = (state) => {
    const { error, success } = state.Profile;
    const { authCustomer } = state.LoginCustomer;
    return { error, success, authCustomer };
};
export default withRouter(
    connect(mapStatetoProps)(withNamespaces()(CustomerHome))
);