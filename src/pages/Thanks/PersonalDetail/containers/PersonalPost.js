import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { CardImg } from "reactstrap/es";
import img2 from "./../../../../assets/images/small/img-2.jpg";
import { Col, Card, CardBody, Media } from "reactstrap";

function PersonalPost(props) {
  const { avatarUser } = props;
  const personalPost = useSelector(
    (state) => state?.User?.Personal?.personal?.data
  );

  const centerCard = {
    textAlign: "center",
  };

  return (
    <Col lg="8">
      {personalPost?.length > 0 ? (
        <React.Fragment>
          {personalPost?.map((value, idx) => (
            <Card key={idx}>
              <CardBody>
                <Media className="mb-4">
                  <img
                    className="d-flex mr-3 rounded-circle avatar-sm"
                    src={avatarUser}
                  />
                  <Media body>
                    <div className="thank-people">
                      <h5 className="font-size-14 mt-1">
                        {value?.sender?.name}
                      </h5>
                      <p className="font-size-5 m-1 thank-people__sender">
                        đã gửi lời cảm ơn tới
                      </p>
                      <h5 className="font-size-14 mt-1">
                        {value?.receiver?.name}
                      </h5>
                    </div>
                    <small className="text-muted">
                      {moment(value?.created_at).fromNow()}
                    </small>
                  </Media>
                </Media>
                <h4 className="mt-0 font-size-16">{value.type}</h4>
                <p>{value.content}</p>
                <hr />
                <CardImg className="img-fluid" src={img2} />
              </CardBody>
            </Card>
          ))}
        </React.Fragment>
      ) : (
        <Card>
          <CardBody>
            <h4 style={centerCard}>không có bài viết nào</h4>
          </CardBody>
        </Card>
      )}
    </Col>
  );
}

export default PersonalPost;
