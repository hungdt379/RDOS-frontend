import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";
import PostThank from "./PostThank/PostThank";
import Target from "./Target/Target";
import SideLeft from "./SideLeft/SideLeft";
import Announcement from "./Announcement/Announcement";
import Status from "./Status/Status";
//Import scss
import "../../../assets/scss/custom/pages/thanks/post-thanks.scss";
import "../../../assets/scss/custom/pages/thanks/side-right.scss";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap/es";
import Newsfeed from "./Newsfeed/pages/Newsfeed";

const HomePage = (props) => {
  const [showRank, setShowRank] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content home-page">
        <Container fluid className="container-thanks-home-page">
          <Row>
            <div align="center" className="col-lg-3 col-md-0">
              <div className="side-content">
                <SideLeft />
              </div>
            </div>

            <div className="email-rightbar news-feed col-lg-6 col-md-12">
              <PostThank />
              <Announcement />
              <Row className="drop-button">
                <Col align="center" className="col-6 button-left">
                  <Dropdown
                    isOpen={showRank}
                    toggle={() => setShowRank(!showRank)}
                  >
                    <DropdownToggle className="btn btn-secondary" caret>
                      Xếp hạng cảm ơn{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <SideLeft />
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col align="center" className="col-6 button-right">
                  <Dropdown
                    isOpen={showDepartment}
                    toggle={() => setShowDepartment(!showDepartment)}
                  >
                    <DropdownToggle className="btn btn-secondary" caret>
                      Đồng nghiệp{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <Status />
                      <Target />
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
              <Newsfeed />
            </div>

            <div
              align="center"
              className="side-content-right col-lg-3 col-md-0"
            >
              <div className="side-content">
                <Status />
                <Target />
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
