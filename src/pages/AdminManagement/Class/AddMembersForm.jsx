import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button } from '@mui/material';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import request from '~/utils/http';
const cx = classNames.bind(styles);

function AddMembersForm(curMembers) {
    const context = React.useContext(LoggedContext);
    const [membersSelected, setMembersSelected] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [userListSearch, setUserListSearch] = React.useState([]);

    //search after 1s since user stop typing
    React.useEffect(() => {
        if (search === '') {
            setUserListSearch([]);
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            request
                .get(`/profile?keyword=${search}&roles=student`)
                .then((response) => {
                    if (response.data.users && response.data.users.length > 0) {
                        let data = [];
                        if (membersSelected && membersSelected.length > 0) {
                            data = response.data.users.filter(
                                (user) => membersSelected.findIndex((u) => u.username === user.username) === -1,
                            );
                        } else {
                            data = response.data.users;
                        }
                        setUserListSearch(data);
                    }
                })
                .catch((error) => {
                    context.setShowSnackbar('Không tìm thấy học sinh', 'error');
                });
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm thành viên</h1>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                onInputChange={(e) => setSearch(e.target.value)}
                options={userListSearch}
                disableCloseOnSelect
                getOptionLabel={(option) => option.fullName}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option.fullName}
                    </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label="Tìm học sinh" placeholder="Nhập từ khóa" />}
            />
        </>
    );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default AddMembersForm;
