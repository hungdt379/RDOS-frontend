import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import { getDepartment } from "../../../../store/post/actions";
import {
  getAllFriend,
  getInfoRequest,
  updateProfileRequest,
} from "../../../../store/users/actions";
import ButtonSubmit from "./containers/ButtonSubmit";
import ImageAvatar from "./containers/ImageAvatar";

const EditProfile = (props) => {
  const userData = useSelector(
    (state) => state.User?.infoUser?.dataInfoUser?.data
  );

  const dataDepartment = useSelector(
    (state) => state.Posts?.Department?.dataDepartment
  );

  const data = {
    name: "",
    gender: "",
    birthday: "",
    hometown: "",
    description: "",
    department: "",
  };

  const [profileData, setProfileData] = useState(data);

  useEffect(() => {
    props.dispatch(getInfoRequest());
    props.dispatch(getDepartment());
    props.dispatch(getAllFriend());
  }, []);

  const handleChangeData = (e) => {
    const value = e.target.value;
    setProfileData({
      ...profileData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValue = {
      name: profileData.name || userData?.name,
      avatar: profileData.avatar || userData?.avatar,
      gender: profileData.gender || userData?.gender,
      birthday: profileData.birthday || userData?.birthday,
      department: profileData.department || userData?.department,
      description: profileData.description || userData?.description,
      hometown: profileData.hometown || userData?.hometown,
    };

    props.dispatch(updateProfileRequest(formValue));
  };

  return (
    <React.Fragment>
      <form className="body-profile" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card className="card-profile">
              <CardBody>
                <CardTitle className="mb-4">Nhập thông tin cá nhân</CardTitle>
                <div className="row">
                  <div className="col-xl-8">
                    {/* name */}
                    <div className="form-group row">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 col-form-label"
                      >
                        Tên người dùng:
                      </label>

                      <div className="col-md-9">
                        <input
                          onChange={handleChangeData}
                          className="form-control width60"
                          type="text"
                          maxLength="50"
                          placeholder="50 ký tự."
                          name="name"
                          id="username"
                          defaultValue={userData?.name}
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="form-group row">
                      <label
                        htmlFor="example-tel-input"
                        className="col-md-3 col-form-label"
                      >
                        Giới tính:
                      </label>

                      <div className="col-md-9">
                        <div className="custom-control custom-radio custom-control-inline ">
                          <Input
                            type="radio"
                            value="1"
                            id="customRadioInline1"
                            name="gender"
                            className="custom-control-input"
                            onChange={handleChangeData}
                            checked={userData?.gender === "1"}
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="customRadioInline1"
                          >
                            Nam
                          </Label>
                        </div>
                        &nbsp;
                        <div className="custom-control custom-radio custom-control-inline">
                          <Input
                            type="radio"
                            value="0"
                            id="customRadioInline2"
                            name="gender"
                            className="custom-control-input"
                            onChange={handleChangeData}
                            checked={userData?.gender === "0"}
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="customRadioInline2"
                          >
                            Nữ
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Birthday */}
                    <div className="form-group row">
                      <label
                        htmlFor="example-date-input"
                        className="col-md-3 col-form-label"
                      >
                        Sinh nhật:
                      </label>

                      <div className="col-md-9">
                        <input
                          className="form-control width60"
                          type="date"
                          id="birthday"
                          name="birthday"
                          defaultValue={userData?.birthday}
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>

                    {/* HomeTown */}
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label">
                        Quê quán:
                      </label>
                      <div className="col-md-9">
                        <input
                          onChange={handleChangeData}
                          className="form-control width60"
                          type="text"
                          maxLength="50"
                          placeholder="50 ký tự."
                          name="hometown"
                          id="hometown"
                          defaultValue={userData?.hometown}
                        />
                      </div>
                    </div>

                    {/* Department */}
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label">
                        Phòng ban:
                      </label>

                      <div className="col-md-9">
                        <select
                          name="department"
                          className="custom-select width60"
                          id="department"
                          onChange={handleChangeData}
                        >
                          {dataDepartment?.map((department) => (
                            <option
                              value={department._id}
                              key={department._id}
                              selected={
                                department._id === userData?.department
                                  ? true
                                  : false
                              }
                            >
                              {department.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Imageavatar */}
                  <ImageAvatar objectValue={profileData} />
                </div>
                {/* Description */}
                <div className="form-group row">
                  <label
                    htmlFor="example-tel-input"
                    className="col-md-2 col-form-label"
                  >
                    Giới thiệu:
                  </label>

                  <div className="col-md-10">
                    <textarea
                      className="introduce-profile"
                      type="text"
                      rows="4"
                      maxLength="250"
                      placeholder="Giới thiệu về bản thân (250 ký tự)."
                      name="description"
                      id="description"
                      defaultValue={userData?.description}
                      onChange={handleChangeData}
                    ></textarea>
                  </div>
                </div>
                <ButtonSubmit />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUser: state,
  };
};
export default connect(mapStateToProps)(EditProfile);
