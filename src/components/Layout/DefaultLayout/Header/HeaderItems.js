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
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LoginForm from '~/pages/Auth';
import { Modal } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import request from '~/utils/http';
const cx = classNames.bind(styles);

export default function HeaderItems() {
    const [cookies, removeCookie] = useCookies();

    const user = cookies['user-infor'];

    const isLogin = user ? true : false;

    const styleBox = {
        position: 'absolute',
        width: '400px',
        bgcolor: 'white',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '45px',
        borderRadius: 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
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
        // {
        //     title: 'Thông Báo',
        //     url: '/notification',
        // },
        {
            title: 'Tin Tức',
            url: '/news',
        },
        {
            title: 'Thực đơn',
            url: '/menu',
        },
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const [openLogin, setOpenLogin] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        request
            .post('/auth/logout')
            .then(() => removeCookie('user-infor'))
            .catch((error) => {});
    };

    const handleClickLogin = () => {
        setOpenLogin(true);
        setAnchorEl(null);
    };

    return (
        <>
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
                    <Typography
                        sx={{ minWidth: 120 }}
                        key={index}
                        className={cx('item', { 'active-menu-item': currentPage === page.url })}
                    >
                        <Link to={page.url}>{page.title}</Link>
                    </Typography>
                ))}
                <Tooltip title={isLogin ? 'Cài đặt tài khoản' : 'Đăng nhập/Đăng ký'}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {isLogin ? (
                            <Avatar name={user.fullName} src={user.pictureURL} sx={{ width: 32, height: 32 }} />
                        ) : (
                            <LoginIcon />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isLogin && (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Link to="/profile">
                                <ListItemIcon>
                                    <Avatar src={user.pictureURL} alt={user.fullName} sx={{ width: 24, height: 24 }} />
                                </ListItemIcon>
                                Hồ sơ của tôi
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link
                                to={
                                    user.role === 'admin'
                                        ? '/admin/class'
                                        : user.role === 'chef'
                                          ? '/dish'
                                          : '/schedule'
                                }
                            >
                                <ListItemIcon>
                                    <ChildCareIcon fontSize="small" />
                                </ListItemIcon>
                                Quản lý
                            </Link>
                        </MenuItem>
                        <Divider />
                        {/* <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem> */}
                        {/* <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem> */}
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </div>
                )}
                {!isLogin && (
                    <div>
                        <MenuItem onClick={handleClickLogin}>Đăng nhập</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>Quên Mật Khẩu</MenuItem>
                    </div>
                )}
            </Menu>
            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <LoginForm />
                </Box>
            </Modal>
        </>
    );
}
