import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuProfile from './MenuProfile';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideBar from '../SideBar';
import MessagePopover from '~/components/Messenger/MessagePopover';
import { useEffect, useState } from 'react';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function MainLayout({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [messages, setMessages] = useState([{}]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = useState(true);


    const handleDrawer = (status = false) => {
        setOpen(status);
    }

    useEffect(() => {
        //get data unread message but cannot call api so use dummy data
        const dataMessage = [
            {
                'name': 'Trần Thị Thu Hà',
                'time': '10 giờ',
                'text': 'Tin nhắn và cuộc gọi được bảo mật bằng phương thức end-to-end',
                'avatar': 'https://mui.com/static/images/avatar/1.jpg'
            },
            {
                'name': 'Nguyễn Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Xin chào toàn thể cán bộ giáo viên và học sinh',
                'avatar': 'https://mui.com/static/images/avatar/2.jpg'
            },
            {
                'name': 'Lê Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Chào cô',
                'avatar': 'https://mui.com/static/images/avatar/3.jpg'
            },
            {
                'name': 'Lê Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Chào cô',
                'avatar': 'https://mui.com/static/images/avatar/4.jpg'
            },
            {
                'name': 'Lê Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Chào cô',
                'avatar': 'https://mui.com/static/images/avatar/5.jpg'
            },
            {
                'name': 'Lê Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Chào cô',
                'avatar': 'https://mui.com/static/images/avatar/6.jpg'
            },
            {
                'name': 'Lê Thị Thanh Hà',
                'time': '10 giờ',
                'text': 'Chào cô',
                'avatar': 'https://mui.com/static/images/avatar/7.jpg'
            }
        ]
        setMessages(dataMessage)
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" open={open} style={{ backgroundColor: '#0072cd' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleDrawer(!open)}
                        sx={{ mr: 2 }}
                    >
                        {!open && <MenuIcon />}
                        {open && <ChevronLeftIcon />}
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { sm: 'block' } }}
                    >
                        Smart Kindergarten
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { md: 'flex' } }}>
                        <MessagePopover data={messages} />
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <MenuProfile anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
            <SideBar open={open} children={children} />
        </Box>

    );
}