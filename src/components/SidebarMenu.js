import NotificationsIcon from "@material-ui/icons/Notifications";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import UpdateIcon from "@material-ui/icons/Update";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SidebarMenu() {
  const sampleLocation = useLocation();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <div>
      {userInfo && (
        <div className="sidebar-menu-container">
          <ul className="sidebar-menu">
            <li
              className={
                sampleLocation.pathname === "/routine" &&
                "sidebar-menu-selected"
              }
            >
              <Link to="/routine">
                <FitnessCenterIcon />
              </Link>
            </li>
            {/* <li
              className={
                sampleLocation.pathname === "/income" && "sidebar-menu-selected"
              }
            >
              <Link to="/income">
                <AttachMoneyIcon />
              </Link>
            </li> */}
            <li
              className={
                sampleLocation.pathname === "/entries" &&
                "sidebar-menu-selected"
              }
            >
              <Link to="/entries">
                <UpdateIcon />
              </Link>
            </li>
            <li
              className={
                sampleLocation.pathname === "/" && "sidebar-menu-selected"
              }
            >
              <Link to="/">
                <HomeIcon />
              </Link>
            </li>
            <li
              className={
                sampleLocation.pathname === "/profile" &&
                "sidebar-menu-selected"
              }
            >
              <Link to="/profile">
                <PersonIcon />
              </Link>
            </li>
            <li
              className={
                sampleLocation.pathname === "/alerts" && "sidebar-menu-selected"
              }
            >
              <Link to="/alerts">
                <NotificationsIcon />
              </Link>
            </li>
            {/* <li
              className={
                sampleLocation.pathname === "/activities" &&
                "sidebar-menu-selected"
              }
            >
              <Link to="/activities">
                <FormatListBulletedIcon />
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}
