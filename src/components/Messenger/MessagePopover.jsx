import { Avatar, Badge, Card, CardContent, Grid, IconButton, Popover, Typography } from '@mui/material';
import Conversation from '~/components/Messenger/Conversation';
import SearchBox from '../SearchBox/SearchBox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const IconOpen = () => (
    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
            <MailIcon />
        </Badge>
    </IconButton>
);

export default function MessagePopover({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div onClick={handleClick}>
                <IconOpen />
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div style={{ padding: '10px 15px', borderRadius: 10 }}>
                    <h2 style={{ color: '#000000b8' }}>Đoạn chat</h2>
                    <SearchBox placeholder="Tìm kiếm trên tin nhắn" />
                    <div style={{ maxHeight: 400, overflowY: 'scroll' }}>
                        {data.map((value, index) => (
                            <Conversation key={'conversationlist' + index} data={value} />
                        ))}
                    </div>
                    <Link to={'/message'} onClick={handleClose}>
                        <div className={cx('see-more')}>
                            <p>Xem tất cả trong hộp thoại</p>
                        </div>
                    </Link>
                </div>
            </Popover>
        </>
    );
}
