// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Typography, Modal } from '@mui/material';
import { useState } from 'react';

export default function Schedule() {
    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
    // const events = [
    //     {
    //         title: 'Event 1',
    //         start: '2024-03-30T10:00:00',
    //         end: '2024-03-30T12:00:00',
    //     },
    //     {
    //         title: 'Event 2',
    //         start: '2024-03-31T14:00:00',
    //         end: '2024-03-31T16:00:00',
    //     },
    //     // Add more events as needed
    // ];
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const handleEventClick = (clickInfo) => {
    //     // alert(`Clicked on event with title ${clickInfo.event.title}`);
    //     handleOpen();
    // };
    // return (
    //     <div height={"100%"}>
    //         <h1>Schedule</h1>
    //         <FullCalendar
    //             plugins={[dayGridPlugin]}
    //             eventClick={handleEventClick}
    //             initialView="dayGridMonth"
    //             events={events}
    //             height="1150px"
    //         />
    //         <Modal
    //             open={open}
    //             onClose={handleClose}
    //             aria-labelledby="modal-modal-title"
    //             aria-describedby="modal-modal-description"
    //         >
    //             <Box sx={style}>
    //                 <Typography id="modal-modal-title" variant="h6" component="h2">
    //                     Text in a modal
    //                 </Typography>
    //                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //                     Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //                 </Typography>
    //             </Box>
    //         </Modal>
    //     </div>
    // );
}
