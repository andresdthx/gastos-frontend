import React, { useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import UpdateIcon from "@material-ui/icons/Update";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useLocation  } from "react-router-dom";

const dataList = [
  {
    icon: 'AttachMoneyIcon',
    url: '/income'
  },
  {
    icon: 'UpdateIcon',
    url: '/entries'
  },
  {
    icon: 'HomeIcon',
    url: '/'
  },
  {
    icon: 'NotificationsIcon',
    url: '/alerts'
  },
  {
    icon: 'FormatListBulletedIcon',
    url: '/activities'
  }
]

export default function SidebarMenu() {
  const sampleLocation = useLocation();

  useEffect(() => {
    console.log(sampleLocation.pathname)
  }, [sampleLocation]);

  return (
    <div className="sidebar-menu-container">
      <ul className="sidebar-menu">
        <li className={ sampleLocation.pathname === '/income' && 'sidebar-menu-selected'}>
          <Link to="/income">
            <AttachMoneyIcon />
          </Link>
        </li>
        <li className={ sampleLocation.pathname === '/entries' && 'sidebar-menu-selected'}>
          <Link to="/entries">
            <UpdateIcon />
          </Link>
        </li>
        <li className={ sampleLocation.pathname === '/' && 'sidebar-menu-selected'}>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li className={ sampleLocation.pathname === '/alerts' && 'sidebar-menu-selected'}>
          <Link to="/alerts">
            <NotificationsIcon />
          </Link>
        </li>
        <li className={ sampleLocation.pathname === '/activities' && 'sidebar-menu-selected'}>
          <Link to="/activities">
            <FormatListBulletedIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
}
