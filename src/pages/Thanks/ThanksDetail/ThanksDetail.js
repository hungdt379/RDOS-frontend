import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardBody, Container, Media, Row } from "reactstrap";
//Import Breadcrumb
import { CardImg } from "reactstrap/es";
import { apiUrls } from "../../../apis/api";
import Request from "../../../apis/Request";
import "../../../assets/scss/custom/pages/thanks/post-thanks.scss";
import * as actions from "../../../store/actions";
import {
  getAllFriend,
  getPostDetailRequest,
  postSeenRequest,
} from "../../../store/actions";
import ReactionSeenList from "../Home/Newsfeed/components/ReactionSeenList";

const ThanksDetail = (props) => {
  const { friends, info, avatar } = props;

  const dispatch = useDispatch();
  const dataPost = useSelector(
    (state) => state.Posts?.getPostDetail?.dataPostDetail?.data
  );

  const { id } = useParams();

  const authUserId = useSelector(
    (state) => state.Login?.authUser?.user?.user_id
  );

  const mouseSeen = (e) => {
    e.preventDefault();
    if (info?.viewers?.find((value) => value.user_id === authUserId)) {
      return null;
    } else {
      props.dispatch(postSeenRequest({ thank_id: info?._id }));
      props.dispatch(actions.getAllNewsfeed({ pageIndex: 1, pageSize: 10 }));
    }
  };

  useEffect(() => {
    dispatch(getPostDetailRequest({ id }));
    dispatch(getAllFriend());
    dispatch(actions.getAllNewsfeed({ pageIndex: 1, pageSize: 10 }));
  }, [id]);

  const userId = dataPost?.sender?.user_id;

  const friend = friends?.find((item) => item.user_id === userId);

  return (
    <>
      <div className="page-content thanks-detail">
        <Container>
          <Card onMouseEnter={(e) => mouseSeen(e)} className="post-newfeeds">
            <CardBody>
              <Media className="mb-4">
                <img
                  className="d-flex mr-3 rounded-circle avatar-sm"
                  src={friend?.avatar}
                  alt="thanks"
                />
                <Media body>
                  <div className="thank-people">
                    <h5 className="font-size-14 mt-1">
                      {dataPost?.sender?.name}
                    </h5>
                    <p className="font-size-5 m-1"> cảm ơn </p>
                    <h5 className="font-size-14 mt-1">
                      {dataPost?.receiver?.name}
                    </h5>
                  </div>
                  <small className="text-muted">
                    {moment(dataPost?.created_at).fromNow()}
                  </small>
                </Media>
              </Media>
              <p className="mt-0 font-size-13">{dataPost?.content}</p>
              <div className="img-post-thank">
                {dataPost?.image != undefined && (
                  <img src={dataPost?.image} alt="Thanks" />
                )}
              </div>
              <ReactionSeenList
                info={dataPost}
                authUserId={authUserId}
                userId={userId}
                avatar={avatar}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.User?.Friend?.dataFriends,
    info: state?.Posts?.Newsfeed?.dataNewsfeed,
    avatar: state.User?.Friend?.dataFriends,
  };
};

export default connect(mapStateToProps)(ThanksDetail);
