import React, {useState, Component, useEffect} from "react";
import {Link, withRouter} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/allTable.scss";
import NotFound from "../../Authentication/Page401";
import {getAllTableRequest} from "../../../store/notifications/actions";
import {connect, useSelector} from "react-redux";
import {apiError, loginUser} from "../../../store/auth/login/actions";
import Async from "react-select/async/dist/react-select.esm";
import {Notification} from "../../../store/notifications/reducers";

const  ViewAllTable = (props) => {
    const [role, setRole] = useState([]);
    const [tableState,setTableState] = useState([]);

    const {dataTable} = props;

   useEffect(() => {

        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setRole(obj.data.user.role);
        }

        props.getAllTableRequest();

    }, []);


   return(
         <React.Fragment>
            {(role === 'w')?(
                <div>
                    <div className="MyContainer">
                        <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
                        <div className="form-role">
                            <Link to="/waiter-check-list" className="myButton">Check List</Link>
                            <div className="role">
                                <a>Nhân Viên</a>
                                <p>UserName</p>
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        {dataTable?.map((d, index) => (
                                <Link key={index} to="/waiter-detail-table">
                                    <div className="page" style={{backgroundColor: d?.is_active === true ? "#8FDC2C" : "#E72A2A"}}>
                                        <button>2</button>
                                        <p>{d?.username}</p>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            ):(<NotFound/>)}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        dataTable: state.Notification.getAllTable.allTables
    };
};

export default withRouter(connect(mapStateToProps, {getAllTableRequest,apiError})(ViewAllTable));
