import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import Badge from '@material-ui/core/Badge';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import UpdateIcon from '@material-ui/icons/Update';
import DrawerNotification from '../Drawers/DrawerNotification';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuContent: {
    position: 'absolute',
    right: '2%',
  },
  menuItems: {
    marginRight: '1rem',
    cursor: 'pointer'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '10vh'
  },
  contentHeader:{
    color: 'white',
    background: 'url(images/background/sidebar.jpg)',
    backgroundSize: '100%'
  },
  button:{
    color: 'white'
  },
  icon:{
    color: '#080058'
  },
  accountContent:{
    width: '5rem',
    margin: '0.5rem',
    textAlign: 'center',
  },
  accountIcon:{
    fontSize: '4rem'
  },
  iconsSidebar:{
    color: '#FFFFFF'
  },
  iconsMenu:{
    color: '#000000'
  },
  list:{
    color: '#000000'
  }
}));

export default function Sidebar() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState(0);

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const setNotification = useSelector(state => state.setNotification);
  const { notification } = setNotification;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlerSignout = () => {
    dispatch(signout());
    window.location.reload();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {

    setAnchorEl(null);

    switch (option) {
      case 'logout':
        handlerSignout();
        break;
    
      default:
        break;
    }
  };

  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (open) => {
      setState({ ...state, right: open });
  };

  useEffect(()=>{
    var total = 0;
    if(notification){
      total = notification.map(function(item) {
        var tl = 0;
        if(!item.watched) tl++;
        return tl;
      });
    }
    setNotifications(total);
  }, [notification, setNotification]);

  return (
    <div>
      {
        userInfo && (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="relative"
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

              <Typography className={classes.menuContent}>
                <Link className={classes.iconsSidebar} to="#">
                <Badge className={classes.menuItems} onClick={() => toggleDrawer(true)} badgeContent={notifications} color="primary">
                  <NotificationsIcon  />
                </Badge>
                </Link>
                <span to="/#" onClick={handleClick} className={classes.iconsSidebar}>
                  <PersonIcon />
                  <ArrowDropDownIcon />
                </span>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose()}
                >
                  <Link to="/profile">
                    <MenuItem onClick={() => handleClose()} className={classes.iconsMenu}>Perfil</MenuItem>
                  </Link>
                  <MenuItem onClick={() => handleClose('logout')}>Cerrar sesión</MenuItem>
                </Menu>
              </Typography>
            </Toolbar>
          </AppBar>

          <DrawerNotification
                state={state}
                setState={setState}
          />
          
          <Drawer
            className={classes.drawer}
            anchor="left"
            open={open}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.contentHeader}>
              <div className={classes.drawerHeader}>
                <IconButton className={classes.button} onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>


              <List className={classes.accountContent}>
                <AccountCircleIcon className={classes.accountIcon}  />
                {userInfo.username}
              </List>
            </div>

            <List>

                <Link className={classes.list} to="/">
                  <ListItem onClick={handleDrawerClose} button>
                    <ListItemIcon><HomeIcon className={classes.icon} /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItem>
                </Link>

                <Link className={classes.list} to="/chart">
                  <ListItem onClick={handleDrawerClose} button>
                    <ListItemIcon><InsertChartIcon className={classes.icon} /></ListItemIcon>
                    <ListItemText primary="Graficos" />
                  </ListItem>
                </Link>

                <Link className={classes.list} to="/alert">
                  <ListItem onClick={handleDrawerClose} button>
                    <ListItemIcon><NotificationsIcon className={classes.icon} /></ListItemIcon>
                    <ListItemText primary="Alertas" />
                  </ListItem>
                </Link>

                <ListItem className={classes.list} onClick={handleDrawerClose} button>
                  <ListItemIcon><AttachMoneyIcon className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Ingresos" />
                </ListItem>

                <ListItem className={classes.list} onClick={handleDrawerClose} button>
                  <ListItemIcon><UpdateIcon className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Proximos gastos" />
                </ListItem>

                <Link className={classes.list} to="/activities">
                <ListItem className={classes.list} onClick={handleDrawerClose} button>
                  <ListItemIcon><FormatListBulletedIcon className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Pendientes" />
                </ListItem>
                </Link>
                
            </List>
            <Divider />
          </Drawer>
        </div>
      )}
    </div>
  );
}
