import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function CalendarComponent() {
    const eventActions = [
        <Button label="Cancel" primary={false} keyboardFocused={true} onClick={this.handleClose} />,
        <Button
            label="Delete"
            secondary={true}
            keyboardFocused={true}
            // onClick={() => {
            //     this.deleteEvent(), this.handleClose();
            // }}
        />,
        <Button
            label="Confirm Edit"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleClose}
            // onClick={() => {
            //     this.updateEvent(), this.handleClose();
            // }}
        />,
    ];
    const appointmentActions = [
        <Button label="Cancel" secondary={true} onClick={this.handleClose} />,
        <Button
            label="Submit"
            primary={true}
            keyboardFocused={true}
            // onClick={() => {
            //     this.setNewAppointment(), this.handleClose();
            // }}
        />,
    ];
    return (
        <div id="Calendar">
            {/* react-big-calendar library utilized to render calendar*/}
            <Calendar
                events={this.state.events}
                views={['month', 'week', 'day', 'agenda']}
                timeslots={2}
                defaultView="month"
                defaultDate={new Date()}
                selectable={true}
                onSelectEvent={(event) => this.handleEventSelected(event)}
                onSelectSlot={(slotInfo) => this.handleSlotSelected(slotInfo)}
            />

            {/* Material-ui Modal for booking new appointment */}
            <Dialog
                title={`Book an appointment on ${moment(this.state.start).format('MMMM Do YYYY')}`}
                actions={appointmentActions}
                modal={false}
                open={this.state.openSlot}
                onRequestClose={this.handleClose}
            >
                <TextField
                    floatingLabelText="Title"
                    onChange={(e) => {
                        this.setTitle(e.target.value);
                    }}
                />
                <br />
                <TextField
                    floatingLabelText="Description"
                    onChange={(e) => {
                        this.setDescription(e.target.value);
                    }}
                />
                <TimePicker
                    format="ampm"
                    floatingLabelText="Start Time"
                    minutesStep={5}
                    value={this.state.start}
                    onChange={this.handleStartTime}
                />
                <TimePicker
                    format="ampm"
                    floatingLabelText="End Time"
                    minutesStep={5}
                    value={this.state.end}
                    onChange={this.handleEndTime}
                />
            </Dialog>

            {/* Material-ui Modal for Existing Event */}
            <Dialog
                title={`View/Edit Appointment of ${moment(this.state.start).format('MMMM Do YYYY')}`}
                actions={eventActions}
                modal={false}
                open={this.state.openEvent}
                onRequestClose={this.handleClose}
            >
                <TextField
                    defaultValue={this.state.title}
                    floatingLabelText="Title"
                    onChange={(e) => {
                        this.setTitle(e.target.value);
                    }}
                />
                <br />
                <TextField
                    floatingLabelText="Description"
                    multiLine={true}
                    defaultValue={this.state.desc}
                    onChange={(e) => {
                        this.setDescription(e.target.value);
                    }}
                />
                <TimePicker
                    format="ampm"
                    floatingLabelText="Start Time"
                    minutesStep={5}
                    value={this.state.start}
                    onChange={this.handleStartTime}
                />
                <TimePicker
                    format="ampm"
                    floatingLabelText="End Time"
                    minutesStep={5}
                    value={this.state.end}
                    onChange={this.handleEndTime}
                />
            </Dialog>
        </div>
    );
}

export default CalendarComponent;
