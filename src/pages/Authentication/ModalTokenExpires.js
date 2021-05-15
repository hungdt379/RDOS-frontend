import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import { logoutUser } from "../../store/auth/login/actions";
import { setTokenStatusInvalid } from "../../store/auth/login/actions";

const ModalWarrningToken = () => {
  const dispatch = useDispatch();
  const tokenStatusInvalid = useSelector(
    (state) => state.Login.tokenStatusInvalid
  );
  const closeDialog = () => {
    dispatch(setTokenStatusInvalid(""));
    dispatch(logoutUser(true));
  };

  return (
    <Modal
      isOpen={!!tokenStatusInvalid}
      toggle={() => {
        closeDialog();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          Oops!
        </h5>
        <button
          type="button"
          onClick={() => {
            closeDialog();
          }}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <h5>Phiên đăng nhập hết hạn, vui lòng đăng xuất và đăng nhập lại</h5>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          onClick={() => {
            dispatch(logoutUser(true));
          }}
          className="btn btn-secondary waves-effect"
          data-dismiss="modal"
        >
          Tiếp Tục.
        </button>
      </div>
    </Modal>
  );
};

export default ModalWarrningToken;
