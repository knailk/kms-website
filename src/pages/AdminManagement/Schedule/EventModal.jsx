import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';
import moment from 'moment';
import 'rsuite/dist/rsuite.min.css';
import { Button } from '@mui/material';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import request from '~/utils/http';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SchoolIcon from '@mui/icons-material/School';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Events } from '~/constants/event';
const cx = classNames.bind(styles);

export default function EventModal({ eventSelected, setEventSelected, setOpenModifyModal, setIsUpdateEvent }) {
    const context = React.useContext(LoggedContext);
    const handleSubmit = (event, action) => {
        event.preventDefault();

        if (action === 'create') {
            request
                .post('/admin/class/schedules', {
                    action: eventSelected.action,
                    date: parseInt(moment(eventSelected.start).format('YYYYMMDD'), 10),
                    fromTime: eventSelected.start,
                    toTime: eventSelected.end,
                    classID: eventSelected.classID,
                })
                .then((res) => {
                    context.setShowSnackbar('Tạo mới lịch thành công', 'success');
                    setIsUpdateEvent(true);
                    setOpenModifyModal(false);
                })
                .catch((error) => {
                    context.setShowSnackbar('Tạo mới lịch không thành công', 'error');
                });
        } else if (action === 'update') {
            request
                .put(`/admin/class/schedules/${eventSelected.id}`, eventSelected)
                .then((res) => {
                    context.setShowSnackbar('Chỉnh sửa lịch thành công', 'success');
                    setIsUpdateEvent(true);
                    setOpenModifyModal(false);
                })
                .catch((error) => {
                    context.setShowSnackbar('Chỉnh sửa lịch không thành công', 'error');
                });
        } else if (action === 'delete') {
            request
                .delete(`/admin/class/schedules/${eventSelected.id}`)
                .then((res) => {
                    context.setShowSnackbar('Xoá lịch thành công', 'success');
                    setIsUpdateEvent(true);
                    setOpenModifyModal(false);
                })
                .catch((error) => {
                    context.setShowSnackbar('Xoá lịch không thành công', 'error');
                });
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <SchoolIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {eventSelected.eventAction === 'create' ? 'Tạo sự kiện' : 'Chỉnh sửa sự kiện'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, minWidth: '300px' }}>
                    <Grid container spacing={2}>
                        <TextField
                            name="action"
                            select
                            fullWidth
                            required
                            label="Sự kiện"
                            helperText="Chọn sự kiện"
                            value={eventSelected.action}
                            onChange={(event) => setEventSelected({ ...eventSelected, action: event.target.value })}
                        >
                            {Events.map((option) => (
                                <MenuItem key={option.action} value={option.action}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid container spacing={2}>
                        {eventSelected.eventAction === 'create' ? (
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    onClick={(event) => handleSubmit(event, 'create')}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Tạo sự kiện
                                </Button>
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        color="error"
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={(event) => handleSubmit(event, 'delete')}
                                    >
                                        Xoá sự kiện
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        onClick={(event) => handleSubmit(event, 'update')}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
