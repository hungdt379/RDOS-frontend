import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Col, Row } from "reactstrap";
import Friends from "../Friend/Friends";
import TopThank from "../TopThank/TopThank";

const SideLeft = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <PerfectScrollbar className="mh-55">
            <TopThank />

            <Friends />
          </PerfectScrollbar>
        </Col>
      </Row>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(SideLeft);
