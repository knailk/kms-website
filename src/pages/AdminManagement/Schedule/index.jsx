import * as React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomToolbar from '~/components/Calendar/CustomToolbar';
import classNames from 'classnames/bind';
import 'rsuite/dist/rsuite.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '@mui/material';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import Modal from '@mui/material/Modal';
import request from '~/utils/http';
import SchoolIcon from '@mui/icons-material/School';
import styles from './Schedule.module.scss';
import EventModal from './EventModal';
import { Events } from '~/constants/event';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const cx = classNames.bind(styles);

const styleBox = {
    position: 'absolute',
    bgcolor: 'white',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '45px',
    borderRadius: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function Schedule() {
    const context = React.useContext(LoggedContext);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [isUpdateEvent, setIsUpdateEvent] = React.useState(false);
    const [eventSelected, setEventSelected] = React.useState({});
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
                transformTitleEvent(response.data.schedules);
                setIsUpdateEvent(false);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin lịch học', 'error');
            });
    }, [rangeSchedule, classSelected, isUpdateEvent]);

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

    const eventStyleGetter = (event, start, end) => {
        var style = {
            backgroundColor: event.backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block',
        };
        return {
            style: style,
        };
    };

    const transformTitleEvent = (schedules) => {
        const events = schedules.map((schedule) => {
            const eventProps = Events.find((event) => event.action === schedule.action);

            return {
                id: schedule.id,
                action: schedule.action,
                title: eventProps.title,
                start: new Date(schedule.fromTime),
                end: new Date(schedule.toTime),
                backgroundColor: eventProps.backgroundColor,
            };
        });
        setEvents(events);
    };

    const handleUpdateEvent = (event, target) => {
        console.log(event, target);
        setEventSelected({
            ...event,
            eventAction: 'update',
            classID: classSelected.id,
        });
        setOpenModifyModal(true);
    };

    const handleAddEvent = ({ start, end, slots, action }) => {
        const newEvent = {
            action: 'learning',
            start: start,
            end: end,
            eventAction: 'create',
            classID: classSelected.id,
        };

        setEventSelected(newEvent);
        setOpenModifyModal(true);
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
                    {/* <Button variant="contained" startIcon={<SchoolIcon />}>
                        Tạo lớp mới
                    </Button> */}
                </div>
                <div>
                    {/* <Button
                        variant="contained"
                        startIcon={<PersonRemoveIcon />}
                        color="error"
                        style={{ marginRight: '5px' }}
                    >
                        Xoá thành viên
                    </Button>

                    <Button variant="contained" startIcon={<PersonAddAlt1Icon />}>
                        Thêm thành viên
                    </Button> */}
                </div>
            </div>
            <Calendar
                selectable={viewMode !== 'month'}
                localizer={localizer}
                events={events}
                timeslots={1}
                step={30}
                defaultView="week"
                startAccessor="start"
                endAccessor="end"
                min={new Date(0, 0, 0, 6, 0, 0)}
                max={new Date(0, 0, 0, 20, 0, 0)}
                style={{ height: 'calc(95vh - 196px)', width: '100%' }}
                onNavigate={handleGetSchedule}
                onView={(view) => {
                    handleGetSchedule(new Date(), view);
                }}
                onSelectEvent={handleUpdateEvent}
                onSelectSlot={handleAddEvent}
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: (toolbar) => {
                        return <CustomToolbar toolbar={toolbar} viewMode={viewMode} setViewMode={setViewMode} />;
                    },
                }}
            />

            <Modal
                open={openModifyModal}
                onClose={() => setOpenModifyModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <EventModal
                        setOpenModifyModal={setOpenModifyModal}
                        eventSelected={eventSelected}
                        setEventSelected={setEventSelected}
                        setIsUpdateEvent={setIsUpdateEvent}
                    />
                </Box>
            </Modal>
        </>
    );
}
