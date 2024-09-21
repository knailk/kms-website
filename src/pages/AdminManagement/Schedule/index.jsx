import * as React from 'react';

import classNames from 'classnames/bind';
import 'rsuite/dist/rsuite.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import request from '~/utils/http';
import styles from './Schedule.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ClassCalendar from '~/components/ClassCalendar';

const cx = classNames.bind(styles);

export default function Schedule() {
    const context = React.useContext(LoggedContext);
    const [classes, setClasses] = React.useState([]);
    const [classSelected, setClassSelected] = React.useState({});

    React.useEffect(() => {
        request
            .get(`admin/class`, {
                params: {
                    page: 1,
                    limit: 10,
                },
            })
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
            <div className={cx('schedule-wrapper')}>
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
                </div>
            </div>

            <ClassCalendar classID={classSelected.id} allowModify={true} />
        </>
    );
}
