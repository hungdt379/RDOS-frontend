import React from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

function HeaderCoverImage(props) {
  const { avatarUser } = props;

  return (
    <Row>
      <Col lg="12">
        {props.error && props.error ? (
          <Alert color="danger">{props.error}</Alert>
        ) : null}
        {props.success && props.success ? (
          <Alert color="success">{props.success}</Alert>
        ) : null}

        <Card className="card-heading-image">
          <CardBody>
            <div className="text-center img-avt">
              <img
                src={avatarUser}
                alt=""
                className="rounded-circle"
                height="190"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default HeaderCoverImage;
