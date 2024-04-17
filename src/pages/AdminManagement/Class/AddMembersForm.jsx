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
import request from '~/utils/http';
const cx = classNames.bind(styles);

function AddMembersForm(curMembers) {
    const [memberSelected, setmemberSelected] = React.useState([]);
    const [search, setSearch] = React.useState('');

    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm thành viên</h1>
            <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                <InputLabel id="demo-simple-select-label">Chọn thành viên</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={memberSelected}
                    label="Chọn học sinh"
                    // onChange={handleChangeClass}
                >
                    {memberSelected.map((member) => (
                        <MenuItem key={member.id} value={member}>
                            {member.className}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

export default AddMembersForm;
