import React, {useState, Component, useEffect, useCallback} from "react";
import {Link, withRouter} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/allTable.scss";
import NotFound from "../../Authentication/Page401";
import {getAllTableRequest, getLogOutRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {Button, Modal} from "reactstrap";
import firebase from 'firebase';
import {postNumberCustomerRequest} from "../../../store/post/actions";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import Header from  "../home/myHeader";


const  ViewAllTable = (props) => {
    const [role, setRole] = useState([]);

    let [Length,setLength] = useState([]);

    const {dataTable} = props;

    const [number, setNumber] = useState();

    const [page, setPage] = useState(1);

    const  database =   firebase.database();

    const [id, setID] = useState();

    const [open,setOpen] = useState(false);

    const [openLoadErrorCustomer, setOpenLoadErrorCustomer] = useState(false);

    const [openOpenTableSuccess, setOpenOpenTableSuccess] = useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    }
    const value = {
        table_id: id,
        number_of_customer: number
    }

    const handleClose = () => {
        setOpen(false);
    }


    function postNumberCustomer(){
        if(number == null){
            return;
        }
        if(number > dataTable?.find((d, index) => (d?._id === id)).max_customer){
            setOpen(false);
            setOpenLoadErrorCustomer(true);
            setTimeout(() => {
                setOpenLoadErrorCustomer(false);
            }, 1500)
        }else{
            props.postNumberCustomerRequest(value);
            setOpen(false);
            setOpenOpenTableSuccess(true);
            setTimeout(() => {
                // redirect();
                props.getAllTableRequest(page);


                database.ref('waiter').orderByValue().on('value', (snapshot) => {
                        let l = [1,2,3];
                        setLength(l);

                    }
                )
            }, 1000)
            setTimeout(() => {
                setOpenOpenTableSuccess(false);
            }, 1500)

        }
    }
    // function redirect(){
    //     props.history.push(
    //         {
    //             pathname: '/waiter-detail-table-confirm-order',
    //             state:{
    //                 _id: id,
    //             }
    //         }
    //     );
    // }

    let list = [];

    dataTable.forEach(function(item, index){
        database.ref('waiter/' + item._id).on('value', (snapshot) => {
                list[index] = snapshot.numChildren();
            }
        )
    })

    useEffect(() => {

        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setRole(obj.data.user.role);
        }
        props.getAllTableRequest(page);


        database.ref('waiter').orderByValue().on('value', (snapshot) => {
                let l = [1,2,3];
                setLength(l);

            }
        )


    }, []);

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    return(
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w')?(
                    <div className="container_detail">
                        <div style={{
                            position: 'fixed',
                            width: '100%',
                            zIndex: '100',
                            backgroundColor:'#ffffff'
                        }}>
                            <Header />
                        </div>
                        <PerfectScrollbar style={{paddingTop: '50px'}}>
                            <div className="list" style={{margin: "40px 0",height:"100%"}}>
                                { dataTable?.map((d, index) => (
                                        <div key={index}>
                                            <Link  onClick={(event) => {
                                                setID(d._id)
                                                setTimeout(() => {
                                                    if (d?.is_active === false){
                                                        handleClickOpen()
                                                    }else{
                                                        handleClose()
                                                    }
                                                }, 200)
                                            }} to= {{ pathname: d.is_active == true ? '/waiter-detail-table-confirm-order' : '',
                                                state:{
                                                    _id: d._id,
                                                    username: d.username
                                                }
                                            }}>

                                                <div className="page"  style={ d?.is_active === false ? {backgroundColor: "#CFCFCF",border: "none"}:{backgroundColor: "#FFEFCD"}}>
                                                    {list[index]?<div className="contain_button_all">{list[index]}</div> : ''}
                                                    <div className="content_all">
                                                        <span className="two">{d?.username}</span>
                                                        <span className="one">{d.number_of_customer == 0 ? '' : d.number_of_customer}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )}
                            </div>
                        </PerfectScrollbar>

                        <Dialog open={open}  onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className="dia_title"><div align="center"><b>Số Khách Tại Bàn</b></div></DialogTitle>
                            <DialogContent>
                                <div align="center">Nhập Từ 1 Đến {dataTable?.map((d, index) => (d?._id === id) ? (d?.max_customer) : '')}</div>
                            </DialogContent>
                            <DialogContent>
                                <input
                                    className="text_field"
                                    type="number"
                                    onChange={event => setNumber(event.target.value)}
                                    required
                                    maxLength="2"
                                    onInput={maxLengthCheck}
                                />
                            </DialogContent>
                            <DialogActions>

                                <div align="center" style={{
                                    width:'100%',
                                }}>
                                    <button style={{
                                        backgroundColor: "#E5E5E5",
                                        color:"#1E1C19",
                                        width:'45%',
                                        borderRadius: '10px',
                                        height:'40px',
                                        border:'1px solid #E5E5E5',
                                        margin:'5px'
                                    }} onClick={handleClose} color="primary">
                                        Hủy
                                    </button>

                                    <button style={{
                                        backgroundColor: "#FCBC3A",
                                        color:"#1E1C19",
                                        width:'45%',
                                        borderRadius: '10px',
                                        height:'40px',
                                        border:'1px solid #FCBC3A',
                                        margin:'5px'
                                    }} onClick={postNumberCustomer} color="primary">
                                        Xác Nhận
                                    </button>
                                </div>

                            </DialogActions>
                        </Dialog>
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
                }} isOpen={openLoadErrorCustomer}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "red", fontSize: '50px'}}
                           className="bx bx-calendar-exclamation bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Hãy nhập đúng số khách cho phép</b>
                        </div>
                    </div>
                </Modal>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadErrorCustomer}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "red", fontSize: '50px'}}
                           className="bx bx-calendar-exclamation bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Quá số khách cho phép {dataTable?.map((d, index) => (d?._id === id) ? (d?.full_name) : '')}</b>
                        </div>
                    </div>
                </Modal>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openOpenTableSuccess}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Mở {dataTable?.map((d, index) => (d?._id === id) ? (d?.full_name) : '')} thành công !</b>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        dataTable: state.Notification.getAllTable.allTables,
        dataNumber: state.Posts.postNumberCustomer.dataPostNumberCustomer,
    };
};

export default withRouter(connect(mapStateToProps, {getLogOutRequest,postNumberCustomerRequest,getAllTableRequest,apiError})(ViewAllTable));
