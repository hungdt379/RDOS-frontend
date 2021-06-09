import React, {useState, Component, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";

function CheckList(){
    return(
        <React.Fragment>
            <div className="MyContainer">
                <Link to="/waiter-view-all-table">
                    <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
                </Link>
                <div className="form-role">

                    <div className="role">
                        <a>Nhân Viên</a>
                        <p>UserName</p>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center", justifycontent: "center"}}>
                <h2>Check List</h2>
                <div className="list-Item">

                    <ul>
                        <li>
                            <span>món 1</span>
                            <span>số lượng</span>
                            <span>X</span>
                        </li>
                        <li>
                            <span>món 1</span>
                            <span>số lượng</span>
                            <span>X</span>
                        </li>
                        <li>
                            <span>món 1</span>
                            <span>số lượng</span>
                            <span>X</span>
                        </li>
                        <li>
                            <span>món 1</span>
                            <span>số lượng</span>
                            <span>X</span>
                        </li>

                    </ul>
                </div>
            </div>
        </React.Fragment>

    );
}

export default CheckList;