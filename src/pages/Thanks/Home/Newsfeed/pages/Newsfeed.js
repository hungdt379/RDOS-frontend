import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//Import Image
import "../../../../../assets/scss/custom/pages/thanks/post-thanks.scss";
//Import Breadcrumb
import { getAllNewsfeed } from "../../../../../store/post/actions";
import NewsfeedCard from "../components/NewsfeedCard";

function Newsfeed(props) {
  const { newsfeed } = props;

  useEffect(() => {
    props.dispatch(getAllNewsfeed({ pageIndex: 1, pageSize: 10 }));
  }, []);

  moment.locale("vi");

  return (
    <React.Fragment>
      {newsfeed?.map((value) => (
        <NewsfeedCard
          key={value?._id}
          info={value}
          userId={value.sender.user_id}
        />
      ))}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    newsfeed: state.Posts.Newsfeed.dataNewsfeed,
  };
};

export default connect(mapStateToProps)(Newsfeed);
