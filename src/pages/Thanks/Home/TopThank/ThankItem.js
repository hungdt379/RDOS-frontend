import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function ThankItem(props) {
  const { inforUser, friends, userId } = props;


  const User = friends.find((friend) => friend.user_id === inforUser?._id);

  return (
    <React.Fragment>
      <tr key={userId}>
        <td>
          <img
            className="d-flex mr-1 rounded-circle avatar-xs"
            src={User?.avatar}
          />
        </td>
        <td key={inforUser.user_name}>{inforUser.user_name}</td>
        <td>{inforUser.total}</td>
      </tr>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    friends: state.User?.Friend?.dataFriends,
  };
};

export default connect(mapStateToProps)(ThankItem);
