import React, {useState, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withRouter} from "react-router-dom";
import { useLocation} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import Header from  "../home/myHeader";
import TableNav from "./TableNav";
import {
    getQueueOrderRequest,
    postCancelQueueOrderRequest,
    postCloseTableRequest,
    postConfirmQueueOrderRequest, postCustomizeQueueRequest, postDeleteQueueItemRequest
} from "../../../store/post/actions";
import {getTableRequest, postUpdateTableRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {Button, Modal} from "reactstrap";
//scss
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
//image
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";

const ConfirmOrder = (props) => {
    const [role, setrole] = useState([]);

    const location  = useLocation();

    const {dataTableByID} = props;

    const {dataUpdateTable} = props;

    const {dataQueueOrder} = props;

    const [openLoadPa, setOpenLoadPa] = useState(false);

    const [open,setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [number, setNumber] = useState();
    const customizeNumberSub = (item) =>{
        const aItem = {
            _id: dataQueueOrder._id,
            item_id: item.item_id,
            status: 0
        }
        props.postCustomizeQueueRequest(aItem);
        setTimeout(() => {
            props.getQueueOrderRequest(value);
        }, 500)
    }

    const customizeNumberAdd = (item) =>{
        const aItem = {
            _id: dataQueueOrder._id,
            item_id: item.item_id,
            status: 1
        }
        props.postCustomizeQueueRequest(aItem);
        setTimeout(() => {
            props.getQueueOrderRequest(value);
        }, 500)
    }

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

    const deleteQueueItem = (id) =>{
        const itemDelete = {
            table_id: location.state._id,
            item_id: id
        }
        props.postDeleteQueueItemRequest(itemDelete);
        setTimeout(() => {
            props.getQueueOrderRequest(value);
        }, 500)
    }

    const  confirm = () => {
        props.postConfirmQueueOrderRequest(value)
    }

    const table = {
        _id: location.state._id,
        username: dataTableByID.username,
        navChoose: '2',
    }

    return(
        <React.Fragment>
            <div className="display-customer">


                {(role === 'w')?(
                    <div className="container_detail">
                        <Header username={dataTableByID.username}/>
                        <TableNav item={table}/>
                        <div className= "number_customer_form" >
                            <p style={{marginRight: "40px"}}>Số Khách Tại Bàn: {dataTableByID.number_of_customer}</p>

                            <button className="btn1" onClick={postCloseTable}>Đóng Bàn</button>

                            <button className="btn2" onClick={handleClickOpen}>Sửa Số Khách</button>

                        </div>

                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className="dia_title">Mở Bàn</DialogTitle>
                            <DialogContent>
                                <input
                                    className="text_field"
                                    type="number"
                                    onChange={event => setNumber(event.target.value)}
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button style={{backgroundColor: "#E5E5E5",color:"#1E1C19"}} onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button style={{backgroundColor: "#FCBC3A",color:"#1E1C19"}}  onClick={postUpdateNumberCustomer}  color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div style={{textAlign: "center", justifycontent: "center"}}>
                            <PerfectScrollbar>
                                <div className="list-Item_detail">

                                    {dataQueueOrder.item?.map((d, index) => (
                                            <div className="item-form-detail" key={index} >
                                                <div className="item-form-one">
                                                    <span>{d.detail_item.name}</span>
                                                    <span style={{fontSize: "12px",fontWeight: "normal",
                                                        lineHeight: "15px"}}>{d.total_cost}VNĐ</span>
                                                </div>
                                                <div className="save-button">
                                                <span onClick={() => {
                                                    customizeNumberSub(d)
                                                }}>-</span>
                                                    <span>{d.quantity}</span>
                                                    <span onClick={() => {
                                                        customizeNumberAdd(d)
                                                    }}>+</span>
                                                </div>
                                                <span className="contain_button_detail" onClick={() => {
                                                    deleteQueueItem(d.item_id)
                                                }
                                                }>X</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </PerfectScrollbar>

                            <div className="btn-form">
                                <p className="btn_1" onClick={()=>{
                                    cancel();
                                    setOpenLoadPa(true);
                                    setTimeout(() => {
                                        setOpenLoadPa(false);
                                        window.location.reload();
                                    }, 1000)
                                }}>Hủy</p>
                                <p className="btn_2" onClick={() =>{
                                    confirm();
                                    setOpenLoadPa(true);
                                    setTimeout(() => {
                                        setOpenLoadPa(false);
                                        window.location.reload();
                                    }, 1000)
                                }}>Xác Nhận</p>
                            </div>

                        </div>
                    </div>
                ):(<NotFound/>)}
                <Footer/>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadPa}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Đổi bàn thành công</b>
                        </div>
                    </div>
                </Modal>
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
    };
};

export default withRouter(connect(mapStateToProps, {postCustomizeQueueRequest,postDeleteQueueItemRequest,postConfirmQueueOrderRequest,postCancelQueueOrderRequest,getQueueOrderRequest,getTableRequest,postUpdateTableRequest,postCloseTableRequest,apiError})(ConfirmOrder));
