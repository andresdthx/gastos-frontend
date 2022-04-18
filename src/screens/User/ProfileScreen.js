import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handlerSignout = () => {
    dispatch(signout());
    window.location.href = "/";
  };

  return (
    <div className="user-container">
      <div>
        <div>
          <AccountCircleIcon />
        </div>
        <div>{userInfo.username}</div>
      </div>

      <div onClick={handlerSignout}>
        <ExitToAppIcon />
      </div>
    </div>
  );
}
