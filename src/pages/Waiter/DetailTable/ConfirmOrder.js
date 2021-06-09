import React, {useState, Component, useEffect} from "react";
import "../../../assets/scss/custom/pages/waiter/detailTable.scss";
import {Link} from "react-router-dom";


const ConfirmOrder = (props) => {
    return(
      <React.Fragment>
          <div className="MyContainer">
              <Link to="/waiter-view-all-table">
                  <h3 style={{paddingLeft: "30px", paddingTop:'20px'}}>RDOS</h3>
              </Link>

              <div className="form-role">

                  <div className="role">
                      <a>MB01</a>
                      <p>Mật khẩu</p>
                  </div>
              </div>
          </div>
          <div>
              <ul className="nav-notification">
                  <li>
                      <Link to="/waiter-detail-table-notification">Thông báo</Link>
                  </li>
                  <li>
                      <Link to="/waiter-detail-table-confirm-order">Confirm order</Link>
                  </li>
                  <li>
                      <Link to="/waiter-detail-table-change-table">Đổi Bàn</Link>
                  </li>
                  <li>
                      <Link to="/waiter-detail-table-confirmed-order">Confirmed order</Link>
                  </li>
              </ul>
          </div>
          <div style={{display: "flex",justifyContent: "center"}}>
              <p style={{marginRight: "40px"}}>Số Khách Tại Bàn: 4</p>
              <button>Change</button>
          </div>

          <div className="form">
              <h2>Trang Chi Tiết</h2>
              <div className="list-Item">
                  <ul>
                      <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                          <span>số lượng</span>
                          <span>X</span>

                      </li>

                      <li>
                            <span className="item" >
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                          <span>số lượng</span>
                          <span>X</span>

                      </li>

                      <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                          <span>số lượng</span>
                          <span>X</span>

                      </li>

                      <li>
                            <span className="item">
                                <span>Tên Món</span>
                                <span>giá tiền</span>
                            </span>
                          <span>số lượng</span>
                          <span>X</span>

                      </li>

                  </ul>
              </div>
              <button>Hủy</button>
              <button>Xác Nhận</button>
          </div>
      </React.Fragment>
    );
}

export default ConfirmOrder;