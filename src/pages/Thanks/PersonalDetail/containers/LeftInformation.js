import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";

function LeftInformation(props) {
  const { informationUser } = props;
  const [styleLimit, setStyleLimit] = useState(false);
  const user_id = useSelector((state) => state.Login?.authUser?.user?.user_id);

  return (
    <Card>
      <CardBody>
        <h5 className="mb-4">Thông tin cá nhân</h5>
        <h6>Họ và tên : {informationUser?.name}</h6>
        <h6>
          Ngày sinh :{" "}
          {informationUser?.birthday === undefined
            ? "Chưa khai báo"
            : informationUser?.birthday}
        </h6>
        <h6>
          Phòng ban :{" "}
          {informationUser?.department === undefined
            ? "Chưa có phòng ban"
            : informationUser?.department}
        </h6>
        <h6 className="card-description">
          <p className={!styleLimit ? "limit-text" : null}>
            Giới thiệu bản thân :
            {informationUser?.description === undefined
              ? "Chưa khai báo"
              : informationUser?.description}
          </p>
        </h6>
        <p
          className="see-description"
          onClick={() => setStyleLimit(!styleLimit)}
        >
          {!styleLimit && informationUser?.description?.length > 40 ? (
            <i className="bx bxs-chevron-down bx-flashing"></i>
          ) : null}
        </p>
        {styleLimit ? (
          <p className="see-description" onClick={() => setStyleLimit(false)}>
            <i className="bx bxs-chevron-up"></i>
          </p>
        ) : null}
        <h6>Sở thich : Nghe nhạc</h6>
        <div className="text-center mt-4">
          {user_id === informationUser?.user_id ? (
            <Button type="submit" color="danger" href="/edit-profile">
              Chỉnh sửa thông tin
            </Button>
          ) : (
            <h5 className="see-more">Xem Thêm...</h5>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default LeftInformation;
