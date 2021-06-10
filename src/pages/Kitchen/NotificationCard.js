import React, {useState, useEffect} from "react";
import SimpleBar from "simplebar-react";
import {Link, Switch} from "react-router-dom";


const NotificationCard = (props) => {

    return (
        <SimpleBar>
            <Link
                to=""
                className="text-reset notification-item"
            >
                <div className="media">
                    <div className="media-body">
                        <div className="menu-notification d-flex">
                            <h6 className="mt-0 mb-0">Bàn 1</h6><p className="mb-0 mr-2 ml-2 font-size-11">
                            {"Order được xác nhận"}
                        </p>
                        </div>
                    </div>
                </div>
            </Link>
        </SimpleBar>
    );
};

export default NotificationCard;
