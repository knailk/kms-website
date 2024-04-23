import * as React from 'react';

import classNames from 'classnames/bind';
import 'rsuite/dist/rsuite.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '@mui/material';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import { Calendar } from '~/components/Calendar/Calendar';
import request from '~/utils/http';
import SchoolIcon from '@mui/icons-material/School';
import styles from './Schedule.module.scss';

const cx = classNames.bind(styles);

export default function Schedule() {
    const context = React.useContext(LoggedContext);
    const [classes, setClasses] = React.useState([]);
    const [classSelected, setClassSelected] = React.useState({});

    React.useEffect(() => {
        request
            .get(`admin/class?page=1&limit=10`)
            .then((response) => {
                setClasses(response.data.classes);
                setClassSelected(response.data.classes[0]);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin lớp học', 'error');
            });
    }, []);

    return (
        <>
            <h2 className={cx('title')}>Thời gian biểu lớp học</h2>
            <div className={cx('classes-wrapper')}>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                        <InputLabel id="demo-simple-select-label">Chọn lớp</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classSelected}
                            label="Chọn lớp"
                            onChange={(event) => {
                                setClassSelected(event.target.value);
                            }}
                        >
                            {classes.map((classMap) => (
                                <MenuItem key={classMap.id} value={classMap}>
                                    {classMap.className}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" startIcon={<SchoolIcon />}>
                        Tạo lớp mới
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        startIcon={<PersonRemoveIcon />}
                        color="error"
                        style={{ marginRight: '5px' }}
                    >
                        Xoá thành viên
                    </Button>

                    <Button variant="contained" startIcon={<PersonAddAlt1Icon />}>
                        Thêm thành viên
                    </Button>
                </div>
                <div style={{ height: 'calc(90vh - 196px)', width: '100%' }}>
                    <Calendar />
                </div>
            </div>
        </>
    );
}
