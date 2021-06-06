import React, {useState} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {Link} from "react-router-dom";

const HeaderMenu = (props) => {

    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="home-icon col-2"><Link to="/customer-home"><div>(icon)</div><div>home</div></Link></div>
                <div align="center" className="menu-search col-8"><input className="search-bar" type="text" name="search" placeholder="Search..."/></div>
                <div className="table-header col-2">RDOS</div>
            </div>
        </React.Fragment>
    );
};

export default HeaderMenu;