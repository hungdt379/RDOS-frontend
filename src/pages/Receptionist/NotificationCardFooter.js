import React, {useState, useEffect} from "react";
import SimpleBar from "simplebar-react";
import moment from "moment";
import {Link, Switch} from "react-router-dom";
import {connect} from "react-redux";

const NotificationCardFooter = (props) => {

    const {data, dataTable, userId, menu} = props;

    const table = dataTable.find((item) => item._id === userId);

    const handleChangeMenu = (value) =>{
        if(!menu) return;
        menu(value);
    }

    return (
        <SimpleBar key={data._id}>
            <div className="media mb-3"
                 style={{border: '2px solid green', borderRadius: '5px', width: '100%', backgroundColor: 'white'}}>
                <div className="media-body">
                    <div className="menu-notification d-flex">
                        <h6 className="mt-0 mb-0 font-size-15">{data.user_fullname}</h6>
                        <p className="mt-0 mb-0 mr-2 ml-2 pl-5 font-size-15">
                            {"gọi thanh toán"}
                        </p>
                        <p className="mt-0 mb-0 mr-2 ml-2 pl-5 font-size-15">
                            <i style={{color: "green", fontSize: '20px'}} className="bx bx-calendar-check bx-tada"></i>
                        </p>
                    </div>
                </div>
            </div>
        </SimpleBar>
    );
};

const mapStateToProps = (state) => {
    return {
        dataTable: state.Notification?.getAllTable?.allTables
    };
};

export default connect(mapStateToProps)(NotificationCardFooter);
