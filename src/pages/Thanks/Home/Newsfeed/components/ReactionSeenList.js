import React, { useEffect, useMemo, useState } from "react";
import { Media, Modal } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { reactionsType } from "../Constants";
import * as actions from "../../../../../store/actions";
import { useDispatch } from "react-redux";

const ReactionSeenList = (props) => {
  const { info, avatar, authUserId } = props;

  const dispatch = useDispatch();
  const likeReaction =
    info?.reactions?.filter((i) => i.type === reactionsType.likeType) || [];
  const loveReaction =
    info?.reactions?.filter((i) => i.type === reactionsType.loveType) || [];
  const [dialogStatusReaction, setDialogStatusReaction] = useState(false);
  const [dialogStatusViewer, setDialogStatusViewer] = useState(false);
  const [status, setStatus] = useState("");

  const friendReactionType = info?.reactions?.find(
    (friend) => friend.user_id === authUserId
  );

  useEffect(() => {
    setStatus(friendReactionType?.type);
  }, [friendReactionType]);

  const likeNumber = useMemo(() => {
    return (
      likeReaction?.length +
      (friendReactionType?.type === reactionsType.likeType ? -1 : 0) +
      (status === reactionsType.likeType ? 1 : 0)
    );
  }, [status, likeReaction]);
  const loveNumber = useMemo(() => {
    return (
      loveReaction?.length +
      (friendReactionType?.type === reactionsType.loveType ? -1 : 0) +
      (status === reactionsType.loveType ? 1 : 0)
    );
  }, [status, loveReaction]);

  const userViewer = info?.viewers?.slice(0, 8).map((user) => {
    const friend = avatar.find(
      (friendItem) => friendItem.user_id === user.user_id
    );
    return (
      <div className="user-viewer">
        <img
          src={friend?.avatar}
          className="mr-3 rounded-circle avatar-xs"
          alt="user-pic"
        />
        <p className="user-name">{user?.name}</p>
      </div>
    );
  });

  const onClickStatus = (value) => {
    setStatus((one) => (one === value ? "" : value));
    if (status === undefined || status === "") {
      dispatch(
        actions.postReactionRequest({ thank_id: info?._id, type: value })
      );
    } else if (status !== undefined && status !== value) {
      dispatch(actions.deleteReactionRequest({ thank_id: info?._id }));
      dispatch(
        actions.postReactionRequest({ thank_id: info?._id, type: value })
      );
    } else if (status === value) {
      dispatch(actions.deleteReactionRequest({ thank_id: info?._id }));
    }
  };

  function likeIcon() {
    if (likeNumber > 0) {
      return <i className="bx bxs-like icon-reaction" />;
    } else {
      return null;
    }
  }

  function loveIcon() {
    if (loveNumber > 0) {
      return <i className="bx bxs-heart icon-reaction" />;
    } else {
      return null;
    }
  }

  function totalReaction() {
    if (loveNumber + likeNumber > 0) {
      return (
        <small className="ml-1 total-reaction">{loveNumber + likeNumber}</small>
      );
    } else {
      return null;
    }
  }
  function seenPost() {
    if (info?.viewers) {
      return (
        <React.Fragment>
          <div className="viewer-div gray-color">
            <div className="viewer-list">
              <div className="viewer-div-list">{userViewer}</div>
              {info?.viewers.length - 8 > 0 ? (
                <div className="viewer-list-more">
                  <small>và {info?.viewers.length - 8} người khác...</small>
                </div>
              ) : null}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  function reactionsList() {
    return (
      <div className="viewer-list">
        {info?.reactions?.map((viewer) => {
          const friend = avatar.find(
            (friendItem) => friendItem.user_id === viewer.user_id
          );
          return (
            <div key={viewer.user_id} className="user-item">
              <div className="user-viewer">
                <img
                  src={friend?.avatar}
                  className="mr-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <p className="user-name">{friend?.name}</p>
              </div>
              {viewer.type === reactionsType.likeType ? (
                <i className="bx mr-1 like-icon">👍</i>
              ) : (
                <i className="bx mr-1 heart-icon">❤</i>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  function statusLikeButton() {
    if (status === reactionsType.likeType) {
      return <i className="bx bxs-like mr-1 icon-react-submit gray-color"></i>;
    } else {
      return <i className="bx bx-like mr-1 icon-react-submit gray-color"></i>;
    }
  }
  function statusLoveButton() {
    if (status === reactionsType.loveType) {
      return <i className="bx bxs-heart mr-1 icon-react-submit gray-color"></i>;
    } else {
      return <i className="bx bx-heart mr-1 icon-react-submit gray-color"></i>;
    }
  }

  return (
    <div className="bottom-post-newfeed">
      <Media
        style={{ cursor: "poiter" }}
        className="mt-2 mb-2 seen-reaction-of-post"
      >
        <div
          xl="3"
          lg="4"
          sm="6"
          className="total-reaction-div gray-color"
          onClick={() => {
            setDialogStatusReaction(true);
          }}
        >
          {likeIcon()}
          {loveIcon()}
          {totalReaction()}
        </div>

        <div xl="3" lg="4" sm="6" className="viewer-total">
          {info?.viewers != null && (
            <div
              className="total-viewer-div"
              onClick={() => setDialogStatusViewer(true)}
            >
              <small className="mr-1 total-viewer">
                {info?.viewers.length}
              </small>
              <i className="mdi mdi-eye-check icon-viewer"></i>
            </div>
          )}
        </div>
      </Media>
      <Modal
        isOpen={dialogStatusReaction}
        toggle={() => {
          setDialogStatusReaction(false);
        }}
        className="modal-viewer"
      >
        <div className="modal-viewer-top-bar">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Những người đã bày tỏ cảm xúc.
          </h5>
          <button
            onClick={() => {
              setDialogStatusReaction(false);
            }}
            type="button"
            className="close button-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <PerfectScrollbar>{reactionsList()}</PerfectScrollbar>
      </Modal>

      <Modal
        isOpen={dialogStatusViewer}
        toggle={() => {
          setDialogStatusViewer(false);
        }}
        className="modal-viewer"
      >
        <div className="modal-viewer-top-bar">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Những người đã xem bài viết này
          </h5>
          <button
            onClick={() => {
              setDialogStatusViewer(false);
            }}
            type="button"
            className="close button-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <PerfectScrollbar>{seenPost()}</PerfectScrollbar>
      </Modal>
      <Media className="mb-0 mt-2 ml-0 button-bottom-post-newfeed">
        <div className="mr-1 seen-reaction-button-of-post gray-color">
          <button
            type="button"
            className="seen-reaction-button-post btn gray-color"
            onClick={() => onClickStatus(reactionsType.likeType)}
          >
            {statusLikeButton()}
            Thích
          </button>
        </div>
        <div className="ml-1 seen-reaction-button-of-post">
          <button
            type="button"
            className="seen-reaction-button-post  btn"
            onClick={() => onClickStatus(reactionsType.loveType)}
          >
            {statusLoveButton()}Yêu Thích
          </button>
        </div>
      </Media>
    </div>
  );
};

export default ReactionSeenList;
