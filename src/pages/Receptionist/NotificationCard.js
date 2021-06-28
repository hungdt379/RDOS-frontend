import React, {useState, useEffect} from "react";
import SimpleBar from "simplebar-react";
import moment from "moment";
import {Link, Switch} from "react-router-dom";
import {connect} from "react-redux";

const NotificationCard = (props) => {

    const {data, dataTable, userId, menu} = props;

    const table = dataTable.find((item) => item._id === userId);

    // const handleChangeMenu = (value) =>{
    //     if(!menu) return;
    //     menu(value);
    // }

    const getYoutubeLikeToDisplay = (millisec) => {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + "h" + minutes + "p";
        }
        return minutes + "p";
    }

    return (
        <SimpleBar key={data._id}>
            <Link
                to=""
                className="text-reset notification-item"
            >
                <div className="media">
                    <div className="media-body">
                        <div className="menu-notification d-flex">
                            <h6 className="mt-0 mb-0 font-size-15">{data.user_fulname}</h6>
                            <p className="mt-0 mb-0 mr-2 ml-2 pl-2 font-size-15">
                                {"thanh toán"}
                            </p>
                            <p className="mt-0 mb-0 mr-2 ml-2 pl-2 font-size-15" style={{color: 'blue'}}>
                                {getYoutubeLikeToDisplay(Date.now()-Date.parse(data.updated_at))} <i>trước</i>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </SimpleBar>
    );
};

const mapStateToProps = (state) => {
    return {
        dataTable: state.Notification?.getAllTable?.allTables
    };
};

export default connect(mapStateToProps)(NotificationCard);
