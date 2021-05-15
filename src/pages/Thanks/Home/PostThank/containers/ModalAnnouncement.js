import React from "react";
import WysiwygEditor from "./../Wysiwygeditor";
import { Controller, useForm } from "react-hook-form";

import { Button, Col, Label, Modal, Row } from "reactstrap/es";
import DropUploadImageBox from "./DropUploadImageBox";

function ModalAnnouncement(props) {
  const { open, onClose, handleSubmitAnnouncement } = props;
  const { handleSubmit, control, getValues } = useForm();

  const submit = (data) => {
    
    const value = getValues("editor_content");
    const { files } = data;
    const postData = {
      type: "announcement",
      content: value,
      image: files ? files[0] : undefined,
    };
    handleSubmitAnnouncement(postData);
  };

  return (
    <Modal size="lg" isOpen={open} toggle={onClose} className="pt-5">
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myLargeModalLabel">
          Gửi thông báo.
        </h5>
        <button
          onClick={onClose}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form className="mt-3 mb-3 ml-4 mr-4" onSubmit={handleSubmit(submit)}>
          <Row>
            <Col lg="12">
              <div className="mt-3">
                <Label>Nội dung</Label>
                <Controller
                  render={({ ref, ...propsRender }) => (
                    <WysiwygEditor innerRef={ref} {...propsRender} />
                  )}
                  name="editor_content"
                  control={control}
                  defaultValue=""
                />
              </div>
            </Col>

            <Col lg="12">
              <div className="mt-3">
                <Label>Thêm ảnh</Label>
                <Controller
                  control={control}
                  name="files"
                  render={({ onChange, value }) => (
                    <DropUploadImageBox files={value} onChange={onChange} />
                  )}
                />
              </div>
            </Col>

            <Col lg="12">
              <div align="center" className="mt-3">
                <Button type="submit" color="primary">
                  Gửi thông báo.
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAnnouncement;
