import React, {useState} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";

const ExtraMenu = (props) => {

    return (
        <React.Fragment>
            <div className="title-menu"><b>Đồ ăn kèm</b></div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Khoai chiên</b></div>
                    <div className="item-cost">30.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <button className="add-btn">
                        <div>+</div>
                    </button>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Ngô chiên</b></div>
                    <div className="item-cost">30.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <button className="add-btn">
                        <div>+</div>
                    </button>
                </div>
            </div>
            <div className="item-menu d-flex">
                <div align="left" className="col-10">
                    <div className="item-name"><b>Gà lắc</b></div>
                    <div className="item-cost">50.000 vnd</div>
                </div>
                <div align="right" className="add-button col-2">
                    <button className="add-btn">
                        <div>+</div>
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ExtraMenu;