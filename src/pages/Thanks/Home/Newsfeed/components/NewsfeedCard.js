import moment from "moment";
import "moment/locale/vi";
import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Media } from "reactstrap";
import "../../../../../assets/scss/custom/pages/thanks/post-thanks.scss";
import * as actions from "../../../../../store/actions";
import { postSeenRequest } from "../../../../../store/actions";
import OptionCard from "./OptionCard";
import ReactionSeenList from "./ReactionSeenList";

const NewsfeedCard = (props) => {
  const { info, avatar } = props;
  const userId = props?.info?.receiver?.user_id;
  const authUserId = props?.data?.Login?.authUser?.user?.user_id;
  const mouseSeen = async (e) => {
    e.preventDefault();
    if (info?.viewers?.find((value) => value.user_id === authUserId)) {
      return null;
    } else {
      props.dispatch(postSeenRequest({ thank_id: info?._id }));
      props.dispatch(actions.getAllNewsfeed({ pageIndex: 1, pageSize: 10 }));
    }
  };

  const friendAvatar = avatar.find(
    (friendItem) => friendItem.user_id === userId
  );

  return (
    <Card
      onMouseEnter={(e) => mouseSeen(e)}
      className="post-newfeed card-shadow"
    >
      <CardBody className="cardbody-post-newfeed">
        <Media className="mb-4 tab-bar-post">
          <img
            className="d-flex mr-3 rounded-circle avatar-sm"
            src={friendAvatar?.avatar}
          />
          <Media body>
            <div className="thank-people">
              <h5 className="font-size-15 mt-1">{friendAvatar?.name}</h5>
              <p className="font-size-5 m-1 gray-color"> đã được cảm ơn bởi </p>
              <h5 className="font-size-15 mt-1 gray-color">
                {info.sender?.name}
              </h5>
            </div>
            {
              <small className="text-muted">
                {moment(info.created_at).fromNow()}
              </small>
            }
          </Media>
          <OptionCard info={info} />
        </Media>

        <p className="mt-0 font-size-15 content-post">{info.content}</p>
        <div className="view-more-button">
          <div className="pic-info">
            <a href={info.image || "#"}>
              <img
                className="pic-info-image post-thank-image"
                src={info.image}
                alt=""
              />
            </a>
          </div>
        </div>
        <ReactionSeenList
          info={info}
          authUserId={authUserId}
          userId={userId}
          avatar={avatar}
        />
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
    avatar: state.User?.Friend?.dataFriends,
  };
};

export default connect(mapStateToProps)(NewsfeedCard);
