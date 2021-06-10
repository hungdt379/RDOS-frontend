import React, {useState} from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import imageItem from "../../assets/images/customer/logo-web.jpg";

const ProfileMenu = (props) => {
    const [menu, setMenu] = useState(false);

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item waves-effect"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={imageItem}
                        alt="Header Avatar"
                    />
                    <span  style={{color:"#000000"}} className="d-none d-xl-inline-block ml-2 mr-1">
            Receptionist
          </span>
                    <i style={{color:"#000000"}} className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
                </DropdownToggle>
                <DropdownMenu right>
                    <div className="dropdown-divider"></div>
                    <button
                        className="dropdown-item"
                    >
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
                        <span>Đăng xuất</span>
                    </button>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileMenu;