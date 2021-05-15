import React from "react";

function PersonalUserName(props) {
  const { userName } = props;
  return (
    <React.Fragment>
      <h4 className="text-center mt-3 mb-4">{userName}</h4>
    </React.Fragment>
  );
}

export default PersonalUserName;
