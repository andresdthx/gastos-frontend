import { Drawer } from '@material-ui/core'
import React, { useState } from 'react'

export default function NotificationsScreen() {

    const [state, setState] = useState({ right: true });

    const toggleDrawer = (open, item) => {
        setState({ ...state, right: open });
    };
    return (
        <Drawer anchor={'right'} open={state.right} onClose={() => toggleDrawer(false)}>
                HOla perras
        </Drawer>
    )
}
