import React, {useState, Component, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/allTable.scss";
function ViewAllTable(){
    return(
        <React.Fragment>
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
                <Link to="/waiter-detail-table">
                    <div className="page">
                        <button>2</button>
                        <p>MB01</p>
                    </div>
                </Link>
                <Link>
                    <div className="page">
                        <button>2</button>
                        <p>MB02</p>
                    </div>
                </Link>
                <Link>
                    <div className="page">
                        <button>2</button>
                        <p>MB03</p>
                    </div>
                </Link>
                <Link>
                    <div className="page">
                        <button>2</button>
                        <p>MB04</p>
                    </div>
                </Link>
                <Link>
                    <div className="page">
                        <button>2</button>
                        <p>MB05</p>
                    </div>
                </Link>
               <Link>
                   <div className="page">
                       <button>2</button>
                       <p>MB06</p>
                   </div>
               </Link>
               <Link>
                   <div className="page">
                       <button>2</button>
                       <p>MB07</p>
                   </div>
               </Link>
               <Link>
                   <div className="page">
                       <button>2</button>
                       <p>MB08</p>
                   </div>
               </Link>
                <Link>
                    <div className="page">
                        <button>2</button>
                        <p>MB09</p>
                    </div>
                </Link>
            </div>
            </div>
        </React.Fragment>
    )
}

export default ViewAllTable;