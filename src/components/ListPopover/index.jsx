import { Divider, Grid, Popover, Typography } from '@mui/material';
import MessagePopover from '~/components/Messenger/MessagePopover';
import { useState } from 'react';

export default function ListPopover({ iconOpen, children }) {
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
            <div onClick={handleClick}>{iconOpen}</div>
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
                <Typography sx={{ padding: '5px 10px', borderRadius: 10 }}>
                    {children}
                    {/* <MessagePopover />
                    <Divider style={{ margin: '5px 0px' }} />
                    <MessagePopover /> */}
                </Typography>
            </Popover>
        </>
    );
}
