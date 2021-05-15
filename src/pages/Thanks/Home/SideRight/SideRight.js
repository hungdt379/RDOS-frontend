import React, { useEffect } from "react";
import { Row, Col, Card, CardTitle } from "reactstrap";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import scss
import "../../../../assets/scss/custom/pages/thanks/post-thanks.scss";

//Import Images
import { connect } from "react-redux";

import Status from "./Status";

const SideRight = (props) => {
  const data = [
    {
      id: 1,
      title: "Thể dục thể thao",
      todo: [{ id: 3, name: "Cùng team chống đẩy" }],
    },
    {
      id: 2,
      title: "Tìm hiểu về Redux - Saga",
      todo: [
        { id: 4, name: "Đọc docs thư viện" },
        { id: 5, name: "Chạy thử thư viện" },
        { id: 6, name: "Tạo functions chạy thử" },
      ],
    },
  ];
  return (
    <>
      <Row>
        <Col lg="12">
          <Status />
          <Card>
            <div className="goal-board">
              <CardTitle className="goal-board-title">
                Mục tiêu hoạt động
              </CardTitle>
              {data?.map((item) => (
                <div key={item.id} className="goal-item">
                  <div className="goal-item-title">
                    <h5 className="font-size-15 mt-1">{item.title}</h5>
                  </div>
                  <div className="goal-item-list">
                    {item.todo.map((item) => (
                      <div key={item.id} className="goal-item-singel">
                        <label>
                          <input type="checkbox" />
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => state.User.Friend;

export default connect(mapStateToProps)(SideRight);
