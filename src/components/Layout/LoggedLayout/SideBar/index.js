import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
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
import RequestPageIcon from '@mui/icons-material/RequestPage';
import Logo from '~/components/Logo/Logo';
import { styled } from '@mui/material/styles';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { LoggedContext } from '..';
const cx = classNames.bind(styles);

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3, 3, 0, 3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '65px',
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));
export default function SideBar({ open, children }) {
    const context = useContext(LoggedContext);
    const sideBarTeacher = [
        [
            { name: 'Lịch học', icon: <CalendarMonth />, path: '/schedule' },
            { name: 'Tin nhắn', icon: <Message />, path: '/message' },
            { name: 'Danh sách học sinh', icon: <ListAlt />, path: '/list-student' },
            { name: 'Điểm danh', icon: <Filter9Plus />, path: '/check-in' },
            { name: 'Bảng điểm', icon: <Filter9Plus />, path: '/score-table' },
        ],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Thanh toán', icon: <Payment />, path: '/payment' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const sideBarStudent = [
        [
            { name: 'Lịch học', icon: <CalendarMonth />, path: '/schedule' },
            { name: 'Tin nhắn', icon: <Message />, path: '/message' },
            // { name: 'Thông tin trẻ', icon: <Message />, path: '/child-info' },
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
            { name: 'Lịch học', icon: <CalendarMonth />, path: '/schedule' },
            { name: 'Bản đồ đưa đón', icon: <ListAlt />, path: '/road-map' },
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
    const sideBarAdmin = [
        [
            { name: 'Thông tin chung', icon: <CalendarMonth />, path: '/admin' },
            { name: 'Lớp học', icon: <Message />, path: '/admin/class' },
            { name: 'Lịch biểu', icon: <ListAlt />, path: '/admin/schedule' },
            { name: 'Tin nhắn', icon: <Filter9Plus />, path: '/admin/message' },
            { name: 'Đơn xin vào lớp', icon: <RequestPageIcon />, path: '/admin/request' },
        ],
        [
            { name: 'Hồ sơ cá nhân', icon: <AccountBox />, path: '/profile' },
            { name: 'Đăng xuất', icon: <Logout />, path: '/logout' },
        ],
    ];
    const currentPage = window.location.pathname;

    const userRole = context.userInfo.role;

    const [sideBar, setSideBar] = useState([]);
    useEffect(() => {
        switch (userRole) {
            case 'teacher':
                setSideBar(sideBarTeacher);
                break;
            case 'student':
                setSideBar(sideBarStudent);
                break;
            case 'driver':
                setSideBar(sideBarDriver);
                break;
            case 'chef':
                setSideBar(sideBarChef);
                break;
            case 'admin':
                setSideBar(sideBarAdmin);
                break;
            default:
                break;
        }
    }, []);

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Logo />
                </DrawerHeader>
                {sideBar.map((listItem, index) => (
                    <Fragment key={'list-devide' + index}>
                        <List sx={{ paddingTop: 0 }}>
                            <Divider />
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
