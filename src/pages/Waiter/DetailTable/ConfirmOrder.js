import React, {useState, useEffect} from "react";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import {Link, withRouter} from "react-router-dom";
import { useLocation} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import Header from  "../home/myHeader";
import {
    getQueueOrderRequest,
    postCancelQueueOrderRequest,
    postCloseTableRequest,
    postConfirmQueueOrderRequest
} from "../../../store/post/actions";
import {getTableRequest, postUpdateTableRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {Button} from "reactstrap";


const ConfirmOrder = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataTableByID} = props;

    const {dataUpdateTable} = props;

    const {dataQueueOrder} = props;

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
        number_of_customer: number,
    }


    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.getTableRequest(value);
        props.getQueueOrderRequest(value);

    }, [dataUpdateTable]);

    function postUpdateNumberCustomer(){
        props.postUpdateTableRequest(value)
        setOpen(false);
    }
    function redirect(){
        props.history.push('/waiter-view-all-table');
    }

    function postCloseTable(){
        props.postCloseTableRequest(value);
        setOpen(false);
        setTimeout(() => {
            redirect();
        }, 500)
    }

    const cancel = () =>{

        let dataCancel = {
            _id: dataQueueOrder._id
        }
        props.postCancelQueueOrderRequest(dataCancel);
    }

    const  confirm = () => {
        props.postConfirmQueueOrderRequest(value)
    }

    return(
        <React.Fragment>
            {(role === 'w')?(
                <div>
                    <Header username={dataTableByID.username}/>
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
                        <button onClick={postCloseTable}>CloseTable</button>

                        <button onClick={handleClickOpen}>Update Number Customer</button>

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
                                <Button onClick={postUpdateNumberCustomer}  color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className="form">
                        <h2>Trang Chi Tiết</h2>
                        <div className="list-Item">
                            <ul>
                                {dataQueueOrder.item?.map((d, index) => (
                                        <li key={index} >
                                            <span className="item">
                                             <span>{d.detail_item.name}</span>
                                            <span>số lượng: {d.quantity}</span>
                                            </span>

                                            <span>{d.total_cost}</span>
                                            <span>X</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <button onClick={cancel}>Hủy</button>
                        <button onClick={confirm}>Xác Nhận</button>
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        dataUpdateTable: state.Notification.postUpdateTable.UpdateTableByID,
        dataTableByID: state.Notification.getTable.TableByID,
        dataQueueOrder: state.Posts.getQueueOrder.dataGetQueueOrder,
    };
};

export default withRouter(connect(mapStateToProps, {postConfirmQueueOrderRequest,postCancelQueueOrderRequest,getQueueOrderRequest,getTableRequest,postUpdateTableRequest,postCloseTableRequest,apiError})(ConfirmOrder));