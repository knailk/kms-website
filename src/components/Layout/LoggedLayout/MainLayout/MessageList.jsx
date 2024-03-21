import { Popover } from '@mui/material';

export default function MessageList() {
    return (
        <Popover
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            The content of the Popover.
        </Popover>
    );
}
