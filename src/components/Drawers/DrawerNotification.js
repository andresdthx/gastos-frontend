import { Avatar, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default function DrawerNotification(props) {

    const { state, setState } = props;

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
                                <Avatar className={`card-alert-${item.priority}`}>
                                    R
                                </Avatar>
                            </div>

                            <div>
                                <div>{item.title}</div>
                                <div>{item.message}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Drawer>
    )
}
