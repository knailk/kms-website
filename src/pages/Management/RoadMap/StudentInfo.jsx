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
function StudentInfo() {
    const [checked, setChecked] = React.useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const listStudent = [
        {
            username: '1',
            name: 'Nguyễn Văn A',
            address: '26/56, đường Trung Mỹ Tây 9, khu phố 3, phường Trung Mỹ Tây, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '2',
            name: 'Nguyễn Văn B',
            address: '4/27, đường Tân Thới Nhất 3, khu phố 6, phường Tân Thới Nhất, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '3',
            name: 'Nguyễn Văn C',
            address: '36/18, đường Hồ Đắc Di, khu phố 4, phường Tân Thới Hiệp, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '4',
            name: 'Nguyễn Văn D',
            address: '82/11, đường Trường Chinh, khu phố 7, phường Tân Hưng Thuận, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '5',
            name: 'Nguyễn Văn E',
            address: '45/8, đường Tô Ký, khu phố 2, phường Tân Chánh Hiệp, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '6',
            name: 'Nguyễn Văn F',
            address: '67/22, đường Nguyễn Văn Quá, khu phố 4, phường Đông Hưng Thuận, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '7',
            name: 'Nguyễn Văn G',
            address: '31/14, đường Phan Văn Hớn, khu phố 9, phường Tân Thới Nhất, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '8',
            name: 'Nguyễn Văn H',
            address: '10/5, đường Lê Văn Khương, khu phố 1, phường Hiệp Thành, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '9',
            name: 'Nguyễn Văn I',
            address: '20/16, đường Nguyễn Ảnh Thủ, khu phố 8, phường Tân Chánh Hiệp, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
        {
            username: '10',
            name: 'Nguyễn Văn K',
            address: '56/33, đường Trường Sơn, khu phố 2, phường Tân Thới Nhất, quận 12, TP.Hồ Chí Minh',
            lat: 10.857466424875572,
            lng: 106.63729829934456,
        },
    ];
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
                            <ListItemButton role={undefined} onClick={handleToggle(value.username)} dense>
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
