import React, {useState, useEffect} from "react";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import {Link, withRouter} from "react-router-dom";
import { useLocation} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import {postCloseTableRequest} from "../../../store/post/actions";
import {getTableRequest, postUpdateTableRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {Button} from "reactstrap";


const ConfirmOrder = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataTableByID} = props;
    console.log(dataTableByID);

    const {dataCloseTable} = props;

    const [open,setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [number, setNumber] = useState();

    const value = {
        table_id: location.state._id,
        number_of_customer: 4,
    }


    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.getTableRequest(value);
    }, [dataCloseTable]);

    function postUpdateNumberCustomer(){
        props.postUpdateTableRequest(value)
        setOpen(false);
    }


    function postCloseTable(){
        props.postCloseTableRequest(value);
        // props.getTableRequest(value);
    }


    return(
        <React.Fragment>
            {(role === 'w')?(
                <div>
                    <div className="MyContainer">
                        <Link to="/waiter-view-all-table">
                            <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
                        </Link>

                        <div className="form-role">

                            <div className="role">
                                <a>{dataTableByID.username}</a>
                                <p>Mật khẩu</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className="nav-notification">
                            <li>
                                <Link to= {{ pathname:'/waiter-detail-table-notification',
                                    state:{
                                        _id: location.state._id,
                                        username: dataTableByID.username,
                                    }
                                }}>Thông báo</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-confirm-order">Confirm order</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-change-table">Đổi Bàn</Link>
                            </li>
                            <li>
                                <Link to="/waiter-detail-table-confirmed-order">Confirmed order</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <button style={{ display: dataTableByID.is_active === false ? "none" : "inline"}} onClick={postCloseTable}>CloseTable</button>

                        <button style={{ display: dataTableByID.is_active === false ? "none" : "inline"}} onClick={handleClickOpen}>Update Number Customer</button>

                        <p style={{marginRight: "40px"}}>Số Khách Tại Bàn: {dataTableByID.number_of_customer}</p>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Mở Bàn</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Nhập Số Lượng Khách Của Bàn.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Số Lượng Khách"
                                    type="number"
                                    fullWidth
                                    onChange={event => setNumber(event.target.value)}
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button style={{ display: dataTableByID.is_active === false ? "none" : "inline"}} onClick={postUpdateNumberCustomer}  color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className="form">
                        <h2>Trang Chi Tiết</h2>
                        <div className="list-Item">
                            <ul>
                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item" >
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                                <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                                    <span>số lượng</span>
                                    <span>X</span>

                                </li>

                            </ul>
                        </div>
                        <button>Hủy</button>
                        <button>Xác Nhận</button>
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        dataCloseTable: state.Posts.postCloseTable.dataPostCloseTable,
        dataTableByID: state.Notification.getTable.TableByID,
    };
};

export default withRouter(connect(mapStateToProps, {getTableRequest,postUpdateTableRequest,postCloseTableRequest,apiError})(ConfirmOrder));