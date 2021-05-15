import React, { useMemo } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
} from "reactstrap/es";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DropUploadImageBox from "./DropUploadImageBox";

function ModalThank(props) {
  const { open, onClose, handleSubmitThanks } = props;
  const { handleSubmit, control } = useForm();

  const loggedInUser = useSelector(
    (state) => state?.Login?.authUser?.user?.user_id
  );

  const receiver = useSelector((state) => state?.User?.Friend?.dataFriends);

  const listOfColleagues = useMemo(() => {
    return receiver?.filter((user) => user.user_id !== loggedInUser);
  }, [receiver]);

  const optionReceiver = useMemo(() => {
    return listOfColleagues?.map((friend) => ({
      label: friend.name,
      value: friend.user_id,
    }));
  }, [receiver]);

  const submit = (data) => {
    const { content, files, person } = data;
    const postData = {
      type: "thank",
      content: content,
      image: files ? files[0] : undefined,
      receiver: {
        name: person.label,
        user_id: person.value,
      },
    };
    handleSubmitThanks(postData);
  };

  return (
    <Modal size="lg" isOpen={open} toggle={onClose} className="pt-5">
      <form onSubmit={handleSubmit(submit)}>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Gửi lời cảm ơn.
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
          <Row>
            <Col lg="12">
              <FormGroup className="select2-container">
                <Label>Cảm ơn đến</Label>
                <Controller
                  control={control}
                  name="person"
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      options={optionReceiver}
                      classNamePrefix="select2-selection"
                    />
                  )}
                />
              </FormGroup>
            </Col>

            <Col lg="12">
              <div className="mt-3">
                <Label>Nội dung</Label>
                <Controller
                  control={control}
                  name="content"
                  rules={{ required: true }}
                  render={({ onChange, value, ref }) => (
                    <Input
                      type="text"
                      control={control}
                      name="content"
                      onChange={onChange}
                      value={value}
                      rows="5"
                    />
                  )}
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
                  Gửi lời cảm ơn.
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </Modal>
  );
}

export default ModalThank;
