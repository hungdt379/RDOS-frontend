import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllFriend } from "../../../../store/users/actions";
import FriendItem from "./FriendItem";

const Friends = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriend());
  }, []);

  const friendsInfo = useSelector((state) => state.User?.Friend?.dataFriends);

  return (
    <React.Fragment>
      <Card className="body-card">
        <CardBody>
          <CardTitle>
            <p className="friends">Bạn bè</p>
          </CardTitle>
          <ul className="list-unstyled chat-list">
            {friendsInfo?.map((friend, id) => (
              <FriendItem friendInfo={friend} key={id} />
            ))}
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Friends;
