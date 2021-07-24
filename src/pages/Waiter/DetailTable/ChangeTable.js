import React, {useState, Component, useEffect} from "react";
import {Link, useLocation, withRouter} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import bell from "../../../assets/images/customer/bell.png";
import confirmed from "../../../assets/images/receptionist/carousel.png";
import a from "../../../assets/images/waiter/sand-clock.png";
import b from "../../../assets/images/waiter/arrows-exchange.png";
import Header from "../home/myHeader";
//scss
import "../../../assets/scss/custom/pages/waiter/changeTable.scss";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {connect} from "react-redux";
import {postChangeTableRequest} from "../../../store/post/actions";
import {apiError} from "../../../store/auth/login/actions";
import {getCloseTableRequest} from "../../../store/notifications/actions";

const ChangeTable = (props) => {
    const [role, setrole] = useState([]);

    const location = useLocation();

    const {dataCloseTablePage} = props;

    const [tableId, setTableID] = useState();

    const [tableChoose, setTableChoose] = useState('');

    const changeTable = () => {
        const table = {
            from_table_id: location.state._id,
            to_table_id: tableId,
        }
        props.postChangeTableRequest(table);
        props.history.push("/waiter-view-all-table");
    }

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }

        setTableID(null);

        props.getCloseTableRequest();
    }, []);

    console.log('role :' + role);
    return (
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w') ? (
                    <div className="container_detail">
                        <Header username={location.state.username}/>
                        <div className="nav-notification">
                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to={{
                                        pathname: '/waiter-detail-table-notification',
                                        state: {
                                            _id: location.state._id,
                                            username: location.state.username
                                        }
                                    }}><img style={{width: '16px', height: '23px'}} src={bell}/>
                                    </Link>
                                </div>
                                <p>Thông báo</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to={{
                                        pathname: '/waiter-detail-table-confirm-order',
                                        state: {
                                            _id: location.state._id,
                                            username: location.state.username
                                        }
                                    }}>
                                        <img style={{width: '11px', height: '20px'}} src={a}/>
                                    </Link>
                                </div>
                                <p>Confirm Order</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to={{
                                        pathname: '/waiter-detail-table-change-table',
                                        state: {
                                            _id: location.state._id,
                                            username: location.state.username
                                        }
                                    }}>
                                        <img style={{width: '19px', height: '13px'}} src={b}/>
                                    </Link>
                                </div>
                                <p>Đổi Bàn</p>
                            </div>

                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to={{
                                        pathname: '/waiter-detail-table-confirmed-order',
                                        state: {
                                            _id: location.state._id,
                                            username: location.state.username
                                        }
                                    }}>
                                        <img src={confirmed}/>
                                    </Link>
                                </div>
                                <p>Confirmed Order</p>
                            </div>
                        </div>
                        <div style={{textAlign: "center", justifyContent: "center"}}>
                            <div className="list">
                                {dataCloseTablePage?.map((d, index) => (
                                        <label>
                                            <input
                                                type="radio"
                                                value={d._id}
                                                id={d._id}
                                                style={{opacity: '0'}}
                                                name="tableCheck"
                                                className="check-table"
                                                onChange={(e) => (
                                                    setTableChoose(e.target.value),
                                                        setTableID(d._id)
                                                )}
                                                checked={tableChoose === d._id}
                                            />
                                            <div htmlFor={d._id} className="page">
                                                <div className="content_all">
                                                    <span className="two">{d.username}</span>
                                                </div>
                                            </div>
                                            {/*<div for={d._id} className="close-table-item"*/}
                                            {/*     // key={index}*/}
                                            {/*     // onClick={() => {*/}
                                            {/*     //     setTableID(d._id);*/}
                                            {/*     // }}*/}
                                            {/*>*/}
                                            {/*    <div for={d._id} className="page">*/}
                                            {/*        <div className="content_all">*/}
                                            {/*            <span className="two">{d.username}</span>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </label>

                                    )
                                )}
                            </div>
                            <p className="btn-change" onClick={changeTable}>Lưu</p>
                        </div>
                    </div>
                ) : (<NotFound/>)}
                <Footer/>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        dataCloseTablePage: state.Notification.getCloseTable.dataCloseTable,
    };
};


export default withRouter(connect(mapStateToProps, {
    postChangeTableRequest,
    getCloseTableRequest,
    apiError
})(ChangeTable));