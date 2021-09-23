import { Avatar, Drawer } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';

export default function DrawerNotification(props) {

    const { state, setState } = props;

    const setNotification = useSelector(state => state.setNotification);
    const { notification } = setNotification;

    const [notifications, setNotifications] = useState([
        {
            title: 'Pilas, parce',
            priority: 'Alta',
            message: 'Pagar el arriendo'
        },
        {
            title: 'Ojo, papi..',
            priority: 'Media',
            message: 'Pagar el internet rapido'
        }
    ]);

    const toggleDrawer = (open, item) => {
        setState({ ...state, right: open });
    };

    useEffect(()=>{
        var notifications = [];
        if(notification){
          notification.map(item => notifications.push({
              title: item.title,
              body: item.body,
              watched: 1
          }));
        }
        localStorage.setItem('notification', JSON.stringify(notifications));
        setNotifications(notifications);
      }, [notification, setNotification]);

    return (
        <Drawer anchor={'right'} open={state.right} onClose={() => toggleDrawer(false)}>
            <div className="drawer-header">
              <ArrowBackIcon id="close" className="drawer-back" onClick={() => toggleDrawer(false)} />
              <NotificationsIcon />
            </div>
            <div className="drawer-body">
                {
                    notifications.map(item => (
                        <div className="card-notifcation" key={item.title}>
                            <div>
                                <Avatar>
                                    R
                                </Avatar>
                            </div>

                            <div>
                                <div>{item.title}</div>
                                <div>{item.body}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Drawer>
    )
}
