import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import avatar from "../../assets/images/users/avatar-1.jpg";
import { editProfile } from "../../store/actions";
import BackGround from "../../assets/images/thanks/avt.PNG";
import img2 from "../../assets/images/small/img-2.jpg";
import { CardImg } from "reactstrap/es";
import "../../assets/scss/custom/pages/Authentication/user-profile.scss";

const UserProfile = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [idx, setIdx] = useState(1);

  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setName(obj.displayName);
        setEmail(obj.email);
        setIdx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setName(obj.username);
        setEmail(obj.email);
        setIdx(obj.uid);
      }
    }
  }, [props.success]);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card style={sectionStyle}>
                <CardBody>
                  <div className="text-center img-avt">
                    <img
                      src={avatar}
                      alt=""
                      className="rounded-circle"
                      height="190"
                      style={{}}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="text-center mt-3 mb-4">DO HONG HANH</h4>

          <Row>
            <Col lg="4">
              <Card>
                <CardBody>
                  <h5 className="mb-4">Th??ng tin c?? nh??n</h5>
                  <h6>H??? v?? t??n : ????? TH??? H???ng H???nh</h6>
                  <h6>Ng??y sinh : 21/01/2020</h6>
                  <h6>Ph??ng ban : S???n ph???m</h6>
                  <h6>
                    Gi???i thi???u b???n th??n : L?? m???t ng?????i vui v??? ... &ensp;
                    <u>Xem th??m</u>
                  </h6>
                  <h6>S??? thich : Nghe nh???c</h6>
                  <div className="text-center mt-4">
                    <Button type="submit" color="danger" href="/edit-profile">
                      Ch???nh s???a th??ng tin.
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h5 className="mb-4 p-2">M???c ti??u c?? nh??n</h5>{" "}
                  <div
                    className="p-2"
                    style={{ borderBottom: "0.5px solid black" }}
                  >
                    <h6>M???c ti??u : Th??? d???c th??? thao</h6>
                    <h6>M?? t??? : Th??? thao trong gi??? ngh??? gi???i lao.</h6>
                    <h6>?? ngh??a : N??ng cao s???c kh???e cho b???n th??n v?? anh em.</h6>
                    <h6>B???t ?????u: 01/03/2021 K???t th??c: 01/12/2021</h6>
                    <h6>Ri??ng t??: Nh??m. Tr???ng th??i: ??ang di???n ra.</h6>
                  </div>
                  <div
                    className="p-2"
                    style={{ borderBottom: "0.5px solid black" }}
                  >
                    <h6>M???c ti??u : Th??? d???c th??? thao</h6>
                    <h6>M?? t??? : Th??? thao trong gi??? ngh??? gi???i lao.</h6>
                    <h6>?? ngh??a : N??ng cao s???c kh???e cho b???n th??n v?? anh em.</h6>
                    <h6>B???t ?????u: 01/03/2021 K???t th??c: 01/12/2021</h6>
                    <h6>Ri??ng t??: Nh??m. Tr???ng th??i: ??ang di???n ra.</h6>
                  </div>
                  <div className="text-center mt-4">
                    <Button type="submit" color="warning">
                      Qu???n l?? m???c ti??u.
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h5 className="mb-4">???nh c???a b???n </h5>
                  <Row>
                    <Col lg="4">
                      <img src={avatar} alt="" className="mb-4 img-user" />
                    </Col>
                    <Col lg="4">
                      <img src={avatar} alt="" className="mb-4 img-user" />
                    </Col>
                    <Col lg="4">
                      <img src={avatar} alt="" className="mb-4 img-user" />
                    </Col>
                    <Col lg="4">
                      <img src={avatar} alt="" className="mb-4 img-user" />
                    </Col>
                    <Col lg="4">
                      <img src={avatar} alt="" className="mb-4 img-user" />
                    </Col>
                  </Row>
                  <a className="float-right see-more-picture" href="/">
                    <u>Xem th??m h??nh ???nh</u>
                  </a>
                </CardBody>
              </Card>
            </Col>
            <Col lg="8">
              <Card>
                <CardBody>
                  <Media className="mb-4">
                    <img
                      className="d-flex mr-3 rounded-circle avatar-sm"
                      src={avatar}
                    />
                    <Media body>
                      <div className="thank-people">
                        <h5 className="font-size-14 mt-1">
                          Humberto D. Champion
                        </h5>
                        <p className="font-size-5 m-1">
                          {" "}
                          ???? g???i l???i c???m ??n t???i{" "}
                        </p>
                        <h5 className="font-size-14 mt-1">Tr???n Thanh T??ng</h5>
                      </div>
                      <small className="text-muted">(th???i gian)</small>
                    </Media>
                  </Media>

                  <h4 className="mt-0 font-size-16">This Week's Top Stories</h4>

                  <p>Dear Lorem Ipsum,</p>
                  <p>
                    Praesent dui ex, dapibus eget mauris ut, finibus vestibulum
                    enim. Quisque arcu leo, facilisis in fringilla id, luctus in
                    tortor. Nunc vestibulum est quis orci varius viverra.
                    Curabitur dictum volutpat massa vulputate molestie. In at
                    felis ac velit maximus convallis.
                  </p>
                  <p>
                    Sed elementum turpis eu lorem interdum, sed porttitor eros
                    commodo. Nam eu venenatis tortor, id lacinia diam. Sed
                    aliquam in dui et porta. Sed bibendum orci non tincidunt
                    ultrices. Vivamus fringilla, mi lacinia dapibus condimentum,
                    ipsum urna lacinia lacus, vel tincidunt mi nibh sit amet
                    lorem.
                  </p>
                  <p>Sincerly,</p>
                  <hr />
                  <CardImg className="img-fluid" src={img2} />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Media className="mb-4">
                    <img
                      className="d-flex mr-3 rounded-circle avatar-sm"
                      src={avatar}
                    />
                    <Media body>
                      <div className="thank-people">
                        <h5 className="font-size-14 mt-1">
                          Humberto D. Champion
                        </h5>
                        <p className="font-size-5 m-1">
                          {" "}
                          ???? g???i l???i c???m ??n t???i{" "}
                        </p>
                        <h5 className="font-size-14 mt-1">Tr???n Thanh T??ng</h5>
                      </div>
                      <small className="text-muted">(th???i gian)</small>
                    </Media>
                  </Media>

                  <h4 className="mt-0 font-size-16">This Week's Top Stories</h4>

                  <p>Dear Lorem Ipsum,</p>
                  <p>
                    Praesent dui ex, dapibus eget mauris ut, finibus vestibulum
                    enim. Quisque arcu leo, facilisis in fringilla id, luctus in
                    tortor. Nunc vestibulum est quis orci varius viverra.
                    Curabitur dictum volutpat massa vulputate molestie. In at
                    felis ac velit maximus convallis.
                  </p>
                  <p>
                    Sed elementum turpis eu lorem interdum, sed porttitor eros
                    commodo. Nam eu venenatis tortor, id lacinia diam. Sed
                    aliquam in dui et porta. Sed bibendum orci non tincidunt
                    ultrices. Vivamus fringilla, mi lacinia dapibus condimentum,
                    ipsum urna lacinia lacus, vel tincidunt mi nibh sit amet
                    lorem.
                  </p>
                  <p>Sincerly,</p>
                  <hr />
                  <CardImg className="img-fluid" src={img2} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile })(UserProfile)
);
