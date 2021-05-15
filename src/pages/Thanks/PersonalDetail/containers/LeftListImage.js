import React from "react";
import { Card, CardBody } from "reactstrap";
import avatar from "./../../../../assets/images/users/avatar-1.jpg";

function LeftListImage(props) {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-4">Ảnh của bạn </h5>
        <div className="flex-image">
          <div lg="4">
            <img src={avatar} alt="" className="mb-4 img-user" />
          </div>
          <div lg="4">
            <img src={avatar} alt="" className="mb-4 img-user" />
          </div>
          <div lg="4">
            <img src={avatar} alt="" className="mb-4 img-user" />
          </div>
          <div lg="4">
            <img src={avatar} alt="" className="mb-4 img-user" />
          </div>
          <div lg="4">
            <img src={avatar} alt="" className="mb-4 img-user" />
          </div>
        </div>
        <a className="see-more-picture" href="/">
          <h5 className="see-more-image ">Xem Thêm...</h5>
        </a>
      </CardBody>
    </Card>
  );
}

export default LeftListImage;
