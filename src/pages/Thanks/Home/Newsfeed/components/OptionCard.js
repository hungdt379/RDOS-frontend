import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const OptionCard = (props) => {
  const { info } = props;
  return (
    <UncontrolledDropdown className="option-post">
      <DropdownToggle href="#" className="card-drop" tag="i">
        <i className="mdi mdi-dots-horizontal font-size-18"></i>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem href="#">Xóa bài viết</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export default OptionCard;
