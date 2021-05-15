import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

//Import scss
import "../../../assets/scss/custom/pages/Authentication/user-profile.scss";

import HeaderCoverImage from "./containers/HeaderCoverImage";
import PersonalUserName from "./containers/PersonalUserName";
import LeftInformation from "./containers/LeftInformation";
import LeftListImage from "./containers/LeftListImage";
import PersonalPost from "./containers/PersonalPost";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  getPersonalUser,
  getPersonalUserId,
} from "./../../../store/users/actions";
import { getAllFriend } from "../../../store/users/actions";

const PersonalDetail = (props) => {
  const [name, setName] = useState("");
  const [idx, setIdx] = useState(1);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const Friends = useSelector(
    (state) => state?.User?.Friend?.dataFriends,
    shallowEqual
  );
  const personalInformation = useSelector(
    (state) => state?.Login?.authUser?.user,
    shallowEqual
  );

  useEffect(() => {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      setName(personalInformation?.user_name);
      setIdx(personalInformation?.user_id);
    } else if (
      process.env.REACT_APP_DEFAULTAUTH === "fake" ||
      process.env.REACT_APP_DEFAULTAUTH === "jwt"
    ) {
      setName(personalInformation?.user_name);
      setIdx(personalInformation?.user_id);
    }
  }, [props.success]);

  useEffect(() => {
    dispatch(getPersonalUserId(userId));
    dispatch(getPersonalUser());
    dispatch(getAllFriend());
  }, []);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }

  const informationUserId = useSelector(
    (state) => state?.User?.Personal?.userId
  );

  const informationUser = Friends?.find((value) => {
    return value.user_id === informationUserId;
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <HeaderCoverImage
            error={props.error}
            success={props.success}
            avatarUser={informationUser?.avatar}
          />
          <PersonalUserName userName={informationUser?.name} />
          <Row>
            <Col lg="4">
              <LeftInformation informationUser={informationUser} />
              <LeftListImage />
            </Col>
            <PersonalPost avatarUser={informationUser?.avatar} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PersonalDetail;
