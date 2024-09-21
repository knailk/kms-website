import * as React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomToolbar from '~/components/Calendar/CustomToolbar';
import 'rsuite/dist/rsuite.min.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Events } from '~/constants/event';
import EventModal from './EventModal';
import request from '~/utils/http';

const localizer = momentLocalizer(moment);

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

export default function ClassCalendar({ classID, allowModify }) {
    const [events, setEvents] = React.useState([]);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [eventSelected, setEventSelected] = React.useState({});
    const [viewMode, setViewMode] = React.useState('week');
    const [isUpdateEvent, setIsUpdateEvent] = React.useState(false);
    const [rangeSchedule, setRangeSchedule] = React.useState({
        start: moment(new Date()).startOf('week').format('YYYYMMDD'),
        end: moment(new Date()).endOf('week').format('YYYYMMDD'),
    });
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

    const handleUpdateEvent = (event, target) => {
        if (!allowModify) return;

        setEventSelected({
            ...event,
            eventAction: 'update',
            classID: classID,
        });

        setOpenModifyModal(true);
    };

    const handleAddEvent = ({ start, end, slots, action }) => {
        if (!allowModify) return;

        const newEvent = {
            action: 'learning',
            start: start,
            end: end,
            eventAction: 'create',
            classID: classID,
        };

        setEventSelected(newEvent);
        setOpenModifyModal(true);
    };

    React.useEffect(() => {
        request
            .get(`/class/me`, {
                params: {
                    fromDate: rangeSchedule.start,
                    toDate: rangeSchedule.end,
                    ...(classID && { id: classID }),
                },
            })
            .then((response) => {
                transformTitleEvent(response.data.schedules);
                setIsUpdateEvent(false);
            })
            .catch((error) => {
                setEvents([]);
            });
    }, [rangeSchedule, isUpdateEvent, classID]);

    return (
        <>
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
