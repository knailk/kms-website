import * as React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomToolbar from '~/components/Calendar/CustomToolbar';
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
import request from '~/utils/http';
import SchoolIcon from '@mui/icons-material/School';
import styles from './Schedule.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const cx = classNames.bind(styles);

const myEventsList = [{ fromTime: new Date(), toTime: new Date(), title: 'special event' }];

export default function Schedule() {
    const context = React.useContext(LoggedContext);
    const [classes, setClasses] = React.useState([]);
    const [classSelected, setClassSelected] = React.useState({});
    const [viewMode, setViewMode] = React.useState('week');
    const [events, setEvents] = React.useState([]);
    const [rangeSchedule, setRangeSchedule] = React.useState({
        start: moment(new Date()).startOf('week').format('YYYYMMDD'),
        end: moment(new Date()).endOf('week').format('YYYYMMDD'),
    });

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

    React.useEffect(() => {
        if (Object.keys(classSelected).length === 0) return;
        request
            .get(`/class/me?id=${classSelected.id}&fromDate=${rangeSchedule.start}&toDate=${rangeSchedule.end}`)
            .then((response) => {
                const newEvents = response.data.schedules.map((schedule) => {
                    return {
                        title: schedule.action,
                        start: new Date(schedule.fromTime),
                        end: new Date(schedule.toTime),
                    };
                });
                console.log(newEvents);
                setEvents(newEvents);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin lịch học', 'error');
            });
    }, [rangeSchedule, classSelected]);

    const handleGetSchedule = (newDate, view) => {
        let start, end;

        if (view === 'week') {
            start = moment(newDate).startOf('week').format('YYYYMMDD');
            end = moment(newDate).endOf('week').format('YYYYMMDD');
        } else if (view === 'day') {
            start = moment(newDate).format('YYYYMMDD');
            end = moment(newDate).format('YYYYMMDD');
        } else {
            start = moment(newDate).startOf('month').format('YYYYMMDD');
            end = moment(newDate).endOf('month').format('YYYYMMDD');
        }

        setRangeSchedule({ start, end });
    };

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
            </div>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                timeslots={1}
                step={15}
                defaultView="week"
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(90vh - 196px)', width: '100%' }}
                onNavigate={handleGetSchedule}
                onView={(view) => {
                    console.log('2222222222222', view);
                }}
                components={{
                    toolbar: (toolbar) => {
                        return <CustomToolbar toolbar={toolbar} viewMode={viewMode} setViewMode={setViewMode} />;
                    },
                }}
            />
        </>
    );
}
