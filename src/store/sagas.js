import { all } from "redux-saga/effects";

//public
import sagaAccount from "./auth/register/saga";
import sagaAuth from "./auth/login/saga";
import sagaForgetPassword from "./auth/forgetpwd/saga";
import sagaProfile from "./auth/profile/saga";
import sagaLayout from "./layout/saga";
import sagaUser from "./users/saga";
import sagaPost from "./post/sagas";
import sagaStatistics from "./statistics/sagas";
import sagaNotificatons from "./notifications/sagas";

export default function* rootSaga() {
  yield all([
    //public
    ...sagaAccount,
    ...sagaAuth,
    ...sagaProfile,
    ...sagaForgetPassword,
    ...sagaLayout,
    ...sagaUser,
    ...sagaPost,
    ...sagaStatistics,
    ...sagaNotificatons,
  ]);
}
