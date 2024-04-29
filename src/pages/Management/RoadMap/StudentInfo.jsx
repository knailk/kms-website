import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '~/components/Avatar/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Place } from '@mui/icons-material';
function StudentInfo({listStudent, checked, setChecked}) {

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    return (
        <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', margin: 'auto' }}>
            {listStudent.map((value, idx) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <React.Fragment key={value.username}>
                        <ListItem
                            secondaryAction={
                                <>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(value.username)}
                                        checked={checked.indexOf(value.username) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemAvatar>
                                    <Avatar src={`https://mui.com/static/images/avatar/${value.username}.jpg`} />
                                </ListItemAvatar>
                                <ListItemText
                                    id={labelId}
                                    primary={value.name}
                                    // sx={{ marginRight: '20px' }}
                                    secondary={<>{value.address}</>}
                                ></ListItemText>
                            </ListItemButton>
                        </ListItem>
                        {idx !== listStudent.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                );
            })}
        </List>
    );
}

export default StudentInfo;
