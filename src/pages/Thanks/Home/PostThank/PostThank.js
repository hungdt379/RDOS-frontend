import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect, useDispatch } from "react-redux";
import "../../../../assets/scss/custom/pages/thanks/post-thanks.scss";
import {
  getAnnouncementRequest,
  postThankRequest,
} from "../../../../store/post/actions";
import { getAllFriend } from "../../../../store/users/actions";
import CardThank from "./containers/CardThank";
import ModalAnnouncement from "./containers/ModalAnnouncement";
import ModalThank from "./containers/ModalThank";

const PostThank = (props) => {
  const dispatch = useDispatch();
  const [openThank, setOpenThank] = useState(false);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  const handleSubmitThank = (data) => {
    const paramNewfeed = { pageIndex: 1, pageSize: 10 };
    dispatch(postThankRequest({ data, paramNewfeed }));
    setOpenThank(false);
    setOpenAnnouncement(false);
  };

  const handleSubmitAnnouncement = (data) => {
    const paramAnnouncement = { pageSize: 1 };
    dispatch(postThankRequest({ data, paramAnnouncement }));
    setOpenAnnouncement(false);
  };

  useEffect(() => {
    dispatch(getAllFriend());
    dispatch(getAnnouncementRequest({ pageSize: 1 }));
  }, []);

  return (
    <React.Fragment>
      <CardThank
        tog_standard={() => setOpenThank(true)}
        toggleStandardNotification={() => setOpenAnnouncement(true)}
      />

      <ModalThank
        open={openThank}
        onClose={() => setOpenThank(false)}
        handleSubmitThanks={handleSubmitThank}
      />

      <ModalAnnouncement
        open={openAnnouncement}
        onClose={() => setOpenAnnouncement(false)}
        handleSubmitAnnouncement={handleSubmitAnnouncement}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { error, success } = state.Profile;
  const { authUser } = state.Login;
  return {
    error,
    success,
    authUser,
  };
};

export default connect(mapStateToProps)(PostThank);
