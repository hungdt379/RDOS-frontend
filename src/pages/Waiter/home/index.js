import React, {useState, Component, useEffect, useCallback} from "react";
import {Link, withRouter} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/allTable.scss";
import NotFound from "../../Authentication/Page401";
import {getAllTableRequest} from "../../../store/notifications/actions";
import {connect} from "react-redux";
import Header from "../home/myHeader";
import {apiError} from "../../../store/auth/login/actions";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {Button} from "reactstrap";
import firebase from 'firebase';
import {postNumberCustomerRequest} from "../../../store/post/actions";


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


    return(
        <React.Fragment>
            {(role === 'w')?(
                <div>
                    <Header/>
                    <div className="list">
                        {dataTable?.map((d, index) => (
                                <div key={index} onClick={d?.is_active === false ? handleClickOpen : handleClose}>
                                    <Link  onClick={event => setID(d._id)} to= {{ pathname: d.is_active == true ? '/waiter-detail-table-confirm-order' : '',
                                        state:{
                                            _id: d._id,
                                        }
                                    }}>
                                        <div className="page"  style={{backgroundColor: d?.is_active === true ? "#8FDC2C" : "#E72A2A"}}>
                                            {/*<button>{list[index] == 0 ? '' : list[index]}</button>*/}
                                            {list[index]? <button>{list[index]}</button> : ''}
                                            <p>{d?.username}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        )}

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


                            <Button onClick={postNumberCustomer} color="primary">
                                Save
                            </Button>

                        </DialogActions>
                    </Dialog>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        dataTable: state.Notification.getAllTable.allTables,
        dataNumber: state.Posts.postNumberCustomer.dataPostNumberCustomer,
    };
};

export default withRouter(connect(mapStateToProps, {postNumberCustomerRequest,getAllTableRequest,apiError})(ViewAllTable));
