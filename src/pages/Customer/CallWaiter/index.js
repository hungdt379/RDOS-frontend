import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import {Modal} from "reactstrap/es";

// const dish = [
//     "Ba chỉ bò",
//     "Ba chỉ lợn",
//     "Xúc xích",
//     "Sụn",
//     "Bắp bò",
//     "Kim chi",
//     "Rau củ quả",
// ];

function CallWaiter(props) {

    const {open, onClose} = props;

    return (
        <Modal size="lg" isOpen={open} toggle={onClose}>
            <div align='center'
                 style={{marginTop: '50px', marginBottom: '60px', borderRadius: '20px'}}>
                <div style={{paddingTop: '20px', marginBottom: '10px'}} className="note-item">
                    <input style={{height: '100px', width: '95%'}} className="note-input-item" type="text" name="search"
                           placeholder="Note..."/>
                </div>
                <div style={{width: '95%', paddingBottom: '20px'}}>
                    <Link to="/customer-home">
                        <button onClick={onClose} style={{width: '100%'}}>
                            <div>Gọi phục vụ</div>
                        </button>
                    </Link>
                </div>
            </div>
        </Modal>
    )
        ;
};

export default CallWaiter;