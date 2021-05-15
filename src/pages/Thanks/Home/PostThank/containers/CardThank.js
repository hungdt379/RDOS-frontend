import React from "react";
import { Card, CardBody, Media } from "reactstrap";
import { Input } from "reactstrap/es";

function CardThank(props) {
  const { tog_standard, toggleStandardNotification } = props;
  return (
    <Card className="card-postthank">
      <CardBody>
        <Media>
          <Media body>
            <div className="thank-people">
              <Input
                type="text"
                onClick={() => {
                  tog_standard();
                }}
                placeholder="Gửi lời cảm ơn"
                className="form-control mt-0"
                data-toggle="modal"
                data-target=".bs-example-modal-lg"
                readOnly={true}
              />
            </div>

            <Media className="mb-0 mt-2 ml-0">
              <div className="div-post-button mr-2">
                <button
                  onClick={() => {
                    tog_standard();
                  }}
                  type="button"
                  className="post-button btn"
                >
                  <i className="dripicons-heart mr-1"></i>
                  Cảm ơn
                </button>
              </div>

              <div className="div-post-button ml-1">
                <button
                  onClick={() => {
                    toggleStandardNotification();
                  }}
                  type="button"
                  className="post-button btn"
                >
                  <i className="dripicons-bell mr-2"></i>
                  Thông báo
                </button>
              </div>
            </Media>
          </Media>
        </Media>
      </CardBody>
    </Card>
  );
}

export default CardThank;
