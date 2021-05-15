import React, { useState } from "react";
import { Card, CardTitle } from "reactstrap";
import { statusType } from "../constants";
const Status = () => {
  const [renderStatus, setRenderStatus] = useState("");
  function checkHappyStatus() {
    if (renderStatus === statusType.happy) {
      return (
        <div className="happy-option">
          <span
            onClick={() => {
              setRenderStatus("");
            }}
            className="span-icon-status-color"
          >
            <i className="far icon-status-color">😊</i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="happy-option">
          <span
            onClick={() => {
              setRenderStatus(statusType.happy);
            }}
            className="span-icon-status-happy"
          >
            <i className="far fa-smile fa-2x icon-status-happy" />
          </span>
          <p id="happy-icon-title">Tôi vui</p>
        </div>
      );
    }
  }
  function checkNormalStatus() {
    if (renderStatus === statusType.normal) {
      return (
        <div className="normal-option">
          <span
            onClick={() => {
              setRenderStatus("");
            }}
            className="span-icon-status-color"
          >
            <i className="far icon-status-color">😐</i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="normal-option">
          <span
            onClick={() => {
              setRenderStatus(statusType.normal);
            }}
            className="span-icon-status-normal"
          >
            <i className="far fa-meh fa-2x icon-status-normal" />
          </span>
          <p id="normal-icon-title">Tôi bình thường</p>
        </div>
      );
    }
  }
  function checkSadStatus() {
    if (renderStatus === statusType.sad) {
      return (
        <div className="sad-option">
          <span
            onClick={() => {
              setRenderStatus("");
            }}
            className="span-icon-status-color"
          >
            <i className="far icon-status-color">🙁</i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="sad-option">
          <span
            onClick={() => {
              setRenderStatus(statusType.sad);
            }}
            className="span-icon-status-sad"
          >
            <i className="far fa-frown fa-2x icon-status-sad" />
          </span>
          <p id="sad-icon-title">Tôi buồn</p>
        </div>
      );
    }
  }
  function inputStatus() {
    if (renderStatus !== "") {
      return (
        <div className="input-status-body">
          <input className="input-status" placeholder="" autoFocus></input>
        </div>
      );
    } else return null;
  }

  return (
    <Card>
      <div className="status">
        <CardTitle className="status-title">
          Ngày hôm nay bạn thế nào?
        </CardTitle>
        <div className="status-body">
          <div className="status-body-icon">
            {checkHappyStatus()}
            {checkNormalStatus()}
            {checkSadStatus()}
          </div>
          {inputStatus()}
        </div>
      </div>
    </Card>
  );
};

export default Status;
