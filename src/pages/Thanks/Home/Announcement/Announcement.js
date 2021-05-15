import React, { useEffect, useState } from "react";
import { Card, CardBody, Media, Row } from "reactstrap";
import moment from "moment";
import { postThankRequest } from "../../../../store/post/actions";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const Announcement = (props) => {
  const { dispatch } = props;

  const announcement = props?.data?.dataAnnouncement?.data?.[0];

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(postThankRequest({ pageSize: 1 }));
  }, [dispatch]);

  moment.locale("vi");
  var btnTitle = " ";

  const announcementText = announcement?.content?.split(" ");
  const announcementImageCount = [announcement?.image].length;

  function checkContent() {
    if (announcementText?.length >= 41) {
      const textShort = announcement?.content?.split(" ", 40);
      if (showMore === true) {
        return (
          <>
            <div>
              <div className="mt-1 font-size-13">
                {ReactHtmlParser(announcementText?.join(" "))}
              </div>
              {checkImage()}
            </div>
          </>
        );
      } else {
        btnTitle = "Hiển thị đầy đủ";
        return (
          <div>
            <div className="mt-1 font-size-13">
              {ReactHtmlParser(textShort?.join(" "))}...
            </div>
          </div>
        );
      }
    } else if (
      announcementText?.length < 41 &&
      announcementImageCount.length !== 0
    ) {
      if (showMore === true) {
        return (
          <div>
            <div className="mt-1 font-size-13">
              {ReactHtmlParser(announcementText?.join(" "))}
            </div>
            {checkImage()}
            <div
              className="span-showmore pd-3"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              Ẩn bớt
            </div>
          </div>
        );
      } else {
        btnTitle = "Hiển thị đầy đủ";
        return (
          <div>
            <div className="mt-1 font-size-13">
              {ReactHtmlParser(announcementText?.join(" "))}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <div className="mt-1 font-size-13">
            {ReactHtmlParser(announcementText?.join(" "))}
          </div>
        </div>
      );
    }
  }

  function checkImage() {
    if (announcementImageCount === 0) {
      return <div></div>;
    } else if (announcementImageCount === 1) {
      return (
        <div className="single-pic-announcement">
          <ImageNotification announcement={announcement} />
        </div>
      );
    } else if (announcementImageCount === 2) {
      return (
        <Row className="double-pic-announcement-row">
          <div className="double-pic-announcement">
            <ImageNotification announcement={announcement} />
          </div>
          <div className="double-pic-announcement">
            <ImageNotification announcement={announcement} />
          </div>
        </Row>
      );
    } else if (announcementImageCount === 3) {
      return (
        <div>
          <div>
            <Row className="triple-pic-announcement-row">
              <div className="triple-pic-announcement-first">
                <ImageNotification announcement={announcement} />
              </div>
              <div className="triple-pic-announcement-second">
                {[announcement?.image].slice(1, 3).map((v) => {
                  return (
                    <a href={v.src} key={v.src}>
                      <img src={v.src} href={v.src} alt="" />
                    </a>
                  );
                })}
              </div>
            </Row>
          </div>
        </div>
      );
    } else {
      return (
        <Row className="more-pic-announcement-row">
          <div className="more-pic-announcement-first">
            <ImageNotification announcement={announcement} />
          </div>
          <div className="more-pic-announcement-second">
            {[announcement?.image].slice(1, 3).map((v) => {
              return (
                <a href={v.src}>
                  <img src={v.src} href={v.src} alt="" />
                </a>
              );
            })}
          </div>
        </Row>
      );
    }
  }

  return (
    <>
      <Card className="announcement-card">
        <CardBody>
          <Media body className="announcement-body">
            <div className="displayFlex">
              <h5 className="font-size-14 mt-1">
                {announcement?.sender?.name}
              </h5>
              <p className="font-size-5 m-1">
                thông báo <i className="dripicons-pin"></i>
              </p>
            </div>

            {
              <small className="text-muted ml-2">
                {moment(announcement?.created_at).fromNow()}
              </small>
            }

            <div className="bottom-announcement m-4">
              {checkContent()}
              <span
                className="span-showmore pd-3"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {announcement?.image && btnTitle}
              </span>
            </div>
          </Media>
        </CardBody>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.Posts.getAnnouncement,
  };
};
export default connect(mapStateToProps)(Announcement);

function ImageNotification(props) {
  const { announcement } = props;
  return (
    <div>
      {announcement.image && (
        <a href={announcement.image || "#"}>
          <img src={announcement.image} alt="image" />
        </a>
      )}
    </div>
  );
}
