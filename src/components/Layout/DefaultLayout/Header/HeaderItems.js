import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Popover } from '@mui/material';
const cx = classNames.bind(styles);

export default function HeaderItems() {
    const isLogin = false;
    const currentPage = window.location.pathname;
    const landingPages = [
        {
            title: 'Trang chủ',
            url: '/',
        },
        {
            title: 'Về Chúng Tôi',
            url: '/about',
        },
        {
            title: 'Lớp Học',
            url: '/course',
        },
        {
            title: 'Thông Báo',
            url: '/notification',
        },
        {
            title: 'Tin Tức',
            url: '/news',
        },
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box
                alignItems={'flex-end'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'flex-end',
                    height: 40,
                }}
            >
                {landingPages.map((page, index) => (
                    <Typography sx={{ minWidth: 120 }} key={index}>
                        <Link style={{color:currentPage === page.url ? "yellow" :'white'}} to={page.url}>{/*className={cx('item', { 'active-menu-item': currentPage === page.url })}*/}
                            {page.title}
                        </Link>
                    </Typography>
                ))}
                {/*<Tooltip title={isLogin ? 'Cài đặt tài khoản' : 'Đăng nhập/Đăng ký'}> /!* chỗ này k cần title chỉ cần Icon*!/*/}
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {isLogin ? <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> : <LoginIcon />}
                </IconButton>
                {/*</Tooltip>*/}
            </Box>
            <Popover
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isLogin && (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </div>
                )}
                {!isLogin && (
                    <div>
                        <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
                        <MenuItem onClick={handleClose}>Đăng Ký</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>Quên Mật Khẩu</MenuItem>
                    </div>
                )}
            </Popover>
        </React.Fragment>
    );
}
