import React, {useState, useEffect} from "react";

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
//scss
    import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
//image
import bell from  "../../../assets/images/customer/bell.png";
import confirmed from  "../../../assets/images/receptionist/carousel.png";
import a from  "../../../assets/images/waiter/sand-clock.png";
import b from  "../../../assets/images/waiter/arrows-exchange.png";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const ConfirmOrder = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataTableByID} = props;

    const {dataUpdateTable} = props;

    const {dataQueueOrder} = props;

    const {dataConfirm} = props;

    const {dataCancel} = props;

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
            <div className="display-customer">


            {(role === 'w')?(
                <div className="container_detail">
                    <Header username={dataTableByID.username}/>
                    <div className="nav-notification">
                            <div className="nav_form">
                                <div className="link_form">
                                    <Link to= {{ pathname:'/waiter-detail-table-notification',
                                        state:{
                                            _id: location.state._id,
                                            username: dataTableByID.username,
                                        }
                                    }}><img style={{width: '16px', height: '23px'}} src={bell}/>
                                    </Link>
                                </div>
                                <p>Thông báo</p>
                            </div>

                        <div className="nav_form">
                            <div className="link_form">
                                <Link to= {{ pathname:'/waiter-detail-table-confirm-order',
                                    state:{
                                        _id: location.state._id,
                                        username: dataTableByID.username,
                                    }
                                }}>
                                    <img style={{width: '11px', height:'20px'}} src={a}/>
                                </Link>
                            </div>
                            <p>Confirm Order</p>
                        </div>

                        <div className="nav_form">
                            <div className="link_form">
                                <Link to= {{ pathname:'/waiter-detail-table-change-table',
                                    state:{
                                        _id: location.state._id,
                                        username: dataTableByID.username,
                                    }
                                }}>
                                    <img style={{width: '19px', height:'13px'}} src={b}/>
                                </Link>
                            </div>
                            <p>Đổi Bàn</p>
                        </div>

                        <div className="nav_form">
                            <div className="link_form">
                                <Link to= {{ pathname:'/waiter-detail-table-confirmed-order',
                                    state:{
                                        _id: location.state._id,
                                        username: dataTableByID.username,
                                    }
                                }}>
                                    <img src={confirmed}/>
                                </Link>
                            </div>
                            <p>Confirmed Order</p>
                        </div>

                    </div>
                    <div className= "number_customer_form" >
                        <p style={{marginRight: "40px"}}>Số Khách Tại Bàn: {dataTableByID.number_of_customer}</p>

                        <button className="btn1" onClick={postCloseTable}>Đóng Bàn</button>

                        <button className="btn2" onClick={handleClickOpen}>Sửa Số Khách</button>

                    </div>

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

                    <div style={{textAlign: "center", justifycontent: "center"}}>
                        <div className="list-Item_detail">

                                {dataQueueOrder.item?.map((d, index) => (
                                        <div className="item-form-detail" key={index} >
                                            <div className="item-form-one">
                                             <span>{d.detail_item.name}</span>
                                            <span style={{fontSize: "12px",fontWeight: "normal",
                                                lineHeight: "15px"}}>{d.total_cost}</span>
                                            </div>
                                            <span>{d.quantity}</span>
                                            <span className="contain_button_detail">X</span>
                                        </div>
                                    )
                                )}
                        </div>
                        <div className="btn-form">
                            <p className="btn_1" onClick={cancel}>Hủy</p>
                            <p className="btn_2" onClick={confirm}>Xác Nhận</p>
                        </div>

                    </div>
                </div>
            ):(<NotFound/>)}
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
        dataUpdateTable: state.Notification.postUpdateTable.UpdateTableByID,
        dataTableByID: state.Notification.getTable.TableByID,
        dataQueueOrder: state.Posts.getQueueOrder.dataGetQueueOrder,
        dataCancel: state.Posts.postCancelQueueOrder.dataPostCancelQueueOrder,
        dataConfirm: state.Posts.postConfirmQueueOrder.dataPostConfirmQueueOrder,
    };
};

export default withRouter(connect(mapStateToProps, {postConfirmQueueOrderRequest,postCancelQueueOrderRequest,getQueueOrderRequest,getTableRequest,postUpdateTableRequest,postCloseTableRequest,apiError})(ConfirmOrder));