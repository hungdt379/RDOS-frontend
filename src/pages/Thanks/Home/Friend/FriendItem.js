import React from "react";
import { Link } from "react-router-dom";
import Media from "reactstrap/lib/Media";

const FriendItem = (props) => {
  const { friendInfo } = props;

  return (
    <React.Fragment>
      <li
        key={friendInfo?.user_id}
        className={friendInfo?.isActive ? "active" : ""}
      >
        <Link to={`/personal-detail/${friendInfo.user_id}`}>
          <Media className="align-items-center">
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={friendInfo?.avatar}
                alt=""
              />
            </div>
            <div className="align-self-center ml-3">
              <h5 className="font-size-14 font-weight mb-0">
                {friendInfo?.name}
              </h5>
            </div>
          </Media>
        </Link>
      </li>
    </React.Fragment>
  );
};

export default FriendItem;
