import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

const ImageAvatar = (props) => {
  const avatar = useSelector(
    (state) => state.User?.infoUser?.dataInfoUser?.data?.avatar
  );

  const uploadImage = (e) => {
    let file = e.target.files[0];
    props.objectValue["avatar"] = file;
  };

  return (
    <div className="img-avatar col-xl-4">
      <div className="avatar-container">
        <label htmlFor="uploadAvatar" className="avatar-label">
          <img className="rounded-circle img-thumbnail img-profile" src={avatar}></img>
        </label>
        <input
          id="uploadAvatar"
          className="input-upload-img"
          type="file"
          onChange={uploadImage}
          accept="image/gif, image/jpeg, image/png"
          name="imgFile"
        ></input>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(ImageAvatar);
