import React, {useState, Component, useEffect, useCallback} from "react";
import {Link, withRouter} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/allTable.scss";
import NotFound from "../../Authentication/Page401";
import {getAllTableRequest, getLogOutRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import Header from "../home/myHeader";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {Button} from "reactstrap";
import firebase from 'firebase';
import {postNumberCustomerRequest} from "../../../store/post/actions";
import listCheck from "../../../assets/images/customer/play-list-check.png";
import toggle from "../../../assets/images/receptionist/profile.png";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";


const  ViewAllTable = (props) => {
    const [role, setRole] = useState([]);

    let [Length,setLength] = useState([]);

    const [number, setNumber] = useState();

    const  database =   firebase.database();

    const [id, setID] = useState();

    const [open,setOpen] = useState(false);

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
    const {dataTable} = props;

    function postNumberCustomer(){
        if(number == null){
            return;
        }
        props.postNumberCustomerRequest(value);
        setOpen(false);
        setTimeout(() => {
            redirect();
        }, 200)
    }
    function redirect(){
        props.history.push(
            {
                pathname: '/waiter-detail-table-confirm-order',
                state:{
                    _id: id,
                }
            }
        );
    }

    let list = [];

    dataTable.forEach(function(item, index){
        database.ref('waiter/' + item._id).on('value', (snapshot) => {
                list[index] = snapshot.numChildren();
            }
        )
    });
    const [isChecked, setIsChecked] = React.useState(
        false
    );

    useEffect(() => {

        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setRole(obj.data.user.role);
        }
        props.getAllTableRequest();

        database.ref('waiter').orderByValue().on('value', (snapshot) => {
                let l = [1,2,3];
                setLength(l);

            }
        )


    }, []);

    const logout = () => {
        props.getLogOutRequest();
    }

    return(
        <React.Fragment>
            <div className="display-customer">


            {(role === 'w')?(
                <div className="container">
                    <div className="MyHeader">
                        <Link to="/waiter-check-list" className="div-table-code">
                            <img style={{width: '21px', height:'15px'}} src={listCheck}/>
                        </Link>
                        <div className="title_header">
                            <p>ALL Tables</p>
                        </div>
                        <div className="toggle">
                            <img src={toggle}/>
                            <div className="dropdown-content">
                                <Link to="/login" onClick={logout}>Log Out</Link>
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        {dataTable?.map((d, index) => (
                                <div key={index} onClick={d?.is_active === false ? handleClickOpen : handleClose}>
                                    <Link  onClick={event => setID(d._id)} to= {{ pathname: d.is_active == true ? '/waiter-detail-table-confirm-order' : '',
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
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle className="dia_title">Số Khách Tại Bàn</DialogTitle>
                        <DialogContent>
                            <input
                               className="text_field"
                                type="number"
                                fullWidth
                                onChange={event => setNumber(event.target.value)}
                                required
                            />
                        </DialogContent>
                        <DialogActions>

                            <Button style={{backgroundColor: "#E5E5E5",color:"#1E1C19"}} onClick={handleClose} color="primary">
                                Hủy
                            </Button>


                            <Button style={{backgroundColor: "#FCBC3A",color:"#1E1C19"}} onClick={postNumberCustomer} color="primary">
                                Xác Nhận
                            </Button>

                        </DialogActions>
                    </Dialog>
                </div>
            ):(<NotFound/>)}
                <Footer/>
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
