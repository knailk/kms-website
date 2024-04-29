import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);
const myEventsList = [{ fromTime: new Date(), toTime: new Date(), title: 'special event' }];

function CalendarComponent({ events }) {
    return (
        <div>
            <Calendar
                selectable
                localizer={localizer}
                events={myEventsList}
                defaultView="week"
                startAccessor="fromTime"
                endAccessor="toTime"
                style={{ height: 'calc(90vh - 196px)', width: '100%' }}
                components={{
                    toolbar: (toolbar) => {
                        return <CustomToolbar toolbar={toolbar} />;
                    },
                }}
            />
        </div>
    );
}

export default CalendarComponent;
