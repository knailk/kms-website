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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddMembersForm({ members, setOpenAddMembers, currentClass }) {
    const context = React.useContext(LoggedContext);
    const [membersSelected, setMembersSelected] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [usersOption, setUsersOption] = React.useState([]);

    React.useEffect(() => {
        if (search === '') {
            setUsersOption([]);
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            request
                .get(`/profile?keyword=${search}&roles=student`)
                .then((response) => {
                    if (response.data.users && response.data.users.length > 0) {
                        let data = response.data.users;
                        if (membersSelected && membersSelected.length > 0) {
                            data = data.filter(
                                (user) => membersSelected.findIndex((u) => u.username === user.username) === -1,
                            );
                        }
                        if (members && members.length > 0) {
                            data = data.filter((user) => members.findIndex((u) => u.username === user.username) === -1);
                        }
                        setUsersOption(data);
                    }
                })
                .catch((error) => {
                    context.setShowSnackbar('Không tìm thấy học sinh', 'error');
                });
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleAddMembers = () => {
        if (membersSelected.length <= 0) return;

        const usernames = membersSelected.map((user) => user.username);

        request
            .post(`/admin/class/${currentClass.id}/members`, { usernames: usernames })
            .then((res) => {
                context.setShowSnackbar('Thêm thành viên thành công', 'success');

                setUsersOption([]);
                setMembersSelected([]);
                setOpenAddMembers(false);
            })
            .catch((error) => {
                context.setShowSnackbar('Thêm thành viên không thành công', 'error');
            });
    };

    return (
        <div className={cx('modal-add-member')}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm thành viên</h1>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                onInputChange={(e) => {
                    if (e.type === 'change') {
                        setSearch(e.target.value);
                    }
                }}
                onChange={(e, value) => {
                    e.type === 'click' && setMembersSelected(value);
                }}
                options={usersOption}
                disableCloseOnSelect
                getOptionLabel={(option) => option.fullName}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option.fullName}
                    </li>
                )}
                renderInput={(params) => <TextField {...params} label="Tìm học sinh" placeholder="Nhập từ khóa" />}
            />
            <Button
                variant="contained"
                disabled={membersSelected.length <= 0}
                onClick={handleAddMembers}
                className={cx('btn-add-member')}
            >
                <span>Thêm</span>
            </Button>
        </div>
    );
}

export default AddMembersForm;
