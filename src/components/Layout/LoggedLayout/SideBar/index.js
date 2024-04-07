import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
    CalendarMonth,
    Message,
    ListAlt,
    RestaurantMenu,
    Filter9Plus,
    Payment,
    AccountBox,
    Logout,
} from '@mui/icons-material';
import Logo from '~/components/Logo/Logo';
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
const cx = classNames.bind(styles);

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3, 3, 0, 3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));
export default function SideBar({ open, children }) {
    const sideBarTeacher = [
        [
            { name: 'Lịch trình', icon: <CalendarMonth />, path: '/management' },
            { name: 'Tin nhắn', icon: <Message />, path: '/message' },
            { name: 'Danh sách học sinh', icon: <ListAlt />, path: '/list-student' },
            { name: 'Bảng điểm', icon: <Filter9Plus />, path: '/score-table' },
        ],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Thanh toán', icon: <Payment />, path: '/payment' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const sideBarParent = [
        [
            { name: 'Lịch trình', icon: <CalendarMonth />, path: '/management' },
            { name: 'Tin nhắn', icon: <Message />, path: '/message' },
            { name: 'Thông tin trẻ', icon: <Message />, path: '/child-info' },
            { name: 'Bảng điểm', icon: <Filter9Plus />, path: '/score-table' },
        ],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Thanh toán', icon: <Payment />, path: '/payment' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const sideBarDriver = [
        [
            { name: 'Lịch trình', icon: <CalendarMonth />, path: '/management' },
            { name: 'Tin nhắn', icon: <Message />, path: '/message' },
            { name: 'Danh sách học sinh', icon: <ListAlt />, path: '/list-student' },
        ],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const sideBarChef = [
        [{ name: 'Danh sách món ăn', icon: <RestaurantMenu />, path: '/food-menu' }],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const currentPage = window.location.pathname;

    const userRole = 'teacher';
    // const userRole = 'parent';
    //const userRole = 'driver';
    // const userRole = 'chef';

    const [sideBar, setSideBar] = useState([]);
    useEffect(() => {
        switch (userRole) {
            case 'teacher':
                setSideBar(sideBarTeacher);
                break;
            case 'parent':
                setSideBar(sideBarParent);
                break;
            case 'driver':
                setSideBar(sideBarDriver);
                break;
            case 'chef':
                setSideBar(sideBarChef);
                break;
            default:
                break;
        }
    }, []);

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Logo />
                </DrawerHeader>
                {sideBar.map((listItem, index) => (
                    <Fragment key={'list-devide' + index}>
                        <Divider />
                        <List>
                            {listItem.map((item, index) => (
                                <Link to={item.path} key={'item' + index}>
                                    <ListItem disablePadding className={cx({ active: currentPage === item.path })}>
                                        <ListItemButton>
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Fragment>
                ))}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </>
    );
}
