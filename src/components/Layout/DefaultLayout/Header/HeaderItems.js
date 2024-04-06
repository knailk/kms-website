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
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LoginForm from '~/pages/Auth';
import { Modal } from '@mui/material';
import { useState } from 'react';
const cx = classNames.bind(styles);

export default function HeaderItems() {
    const isLogin = true;
    const role = 'parent';
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

    const handleClickLogin = () => {
        setOpenLogin(true)
        setAnchorEl(null);
    }

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
                        {isLogin ? <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> : <LoginIcon />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
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
                            <Avatar /> Hồ sơ của tôi
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/child-management'>
                                <ListItemIcon>
                                    <ChildCareIcon fontSize="small" />
                                </ListItemIcon>
                                Quản lý trẻ
                            </Link>

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
                        <MenuItem onClick={handleClickLogin}>Đăng nhập</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>Quên Mật Khẩu</MenuItem>
                    </div>
                )}
            </Menu>
            <Modal open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styleBox}>
                    <LoginForm />
                </Box>
            </Modal>
        </>
    );
}
