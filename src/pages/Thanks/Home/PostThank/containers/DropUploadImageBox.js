import Dropzone from "react-dropzone";
import React, { useMemo } from "react";
import { Card } from "reactstrap";
import { Col, Row } from "reactstrap/es";
import { Link } from "react-router-dom";
import upimage from "./../../../../../assets/images/thanks/upload.png";

const DropUploadImageBox = (props) => {
  const { files, onChange } = props;

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const listFile = useMemo(() => {
    return files?.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
  }, [files]);

  return (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => onChange(acceptedFiles)}
        onChange={(acceptedFiles) => onChange(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input
                {...getInputProps()}
                type="file"
                accept="image/gif, image/jpeg, image/png"
              />
              <div className="dz-message needsclick">
                <div className="mb-2">
                  <img
                    className="display-3 text-muted bx up-image"
                    src={upimage}
                    height="50"
                  />
                </div>
                <h4>Kéo hoặc bấm vào đây để chọn ảnh.</h4>
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      <div className="dropzone-previews mt-2" id="file-previews">
        {listFile?.map((f, i) => {
          return (
            <Card
              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
              key={i + "-file"}
            >
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={f.name}
                      src={f.preview}
                    />
                  </Col>

                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {f.name}
                    </Link>
                    <p className="mb-0">
                      <strong>{f.formattedSize}</strong>
                    </p>
                  </Col>
                </Row>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default DropUploadImageBox;
