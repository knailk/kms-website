import * as React from 'react';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import request from '~/utils/http';
import { Currencies } from '~/constants/currency';
import dayjs from 'dayjs';
import AdjustScheduleForCurrentWeek from '~/utils/getScheduleDefault';

export default function CreateClassForm({ setOpenCreateClass }) {
    const context = React.useContext(LoggedContext);
    const [teachers, setTeachers] = React.useState([]);
    const [drivers, setDrivers] = React.useState([]);
    const [formData, setFormData] = React.useState({
        teacherID: '',
        driverID: '',
        price: 0,
        currency: '',
        fromDate: null,
        toDate: null,
        className: '',
        ageGroup: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            ...formData,
            fromDate: parseInt(dayjs(formData.fromDate).format('YYYYMMDD'), 10),
            toDate: parseInt(dayjs(formData.toDate).format('YYYYMMDD'), 10),
            ageGroup: parseInt(formData.ageGroup, 10),
            price: parseInt(formData.price, 10),
            schedules: AdjustScheduleForCurrentWeek(new Date(formData.fromDate)),
        };

        request
            .post(`/admin/class`, { ...data })
            .then((res) => {
                context.setShowSnackbar('Tạo mới lớp học thành công', 'success');
                setOpenCreateClass(false);
            })
            .catch((error) => {
                context.setShowSnackbar('Tạo mới lớp học không thành công', 'error');
            });
    };

    React.useEffect(() => {
        request
            .get('/profile/teacher-available')
            .then((response) => {
                setTeachers(response.data.teachers);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin giáo viên', 'error');
            });
    }, []);

    React.useEffect(() => {
        request
            .get('/profile/driver-available')
            .then((response) => {
                setDrivers(response.data.drivers);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin tài xế', 'error');
            });
    }, []);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <SchoolIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Tạo lớp học
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="teacherID"
                                select
                                fullWidth
                                required
                                label="Giáo viên"
                                helperText="Chọn giáo viên"
                                value={formData.teacherID}
                                onChange={handleChange}
                            >
                                {teachers.map((option) => (
                                    <MenuItem key={option.username} value={option.username}>
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Avatar src={option.pictureURL} width={40} height={40} />
                                            <span style={{ marginLeft: 20 }}>{option.fullName}</span>
                                        </div>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="driverID"
                                select
                                fullWidth
                                required
                                label="Tài xế"
                                helperText="Chọn tài xế"
                                value={formData.driverID}
                                onChange={handleChange}
                            >
                                {drivers.map((option) => (
                                    <MenuItem key={option.username} value={option.username}>
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Avatar src={option.pictureURL} width={40} height={40} />
                                            <span style={{ marginLeft: 20 }}>{option.fullName}</span>
                                        </div>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="price"
                                required
                                fullWidth
                                id="price"
                                type="number"
                                label="Giá tiền"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="currency"
                                select
                                fullWidth
                                required
                                label="Tiền tệ"
                                helperText="Chọn đơn vị tiền tệ"
                                value={formData.currency}
                                onChange={handleChange}
                            >
                                {Currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DatePicker
                                        label="Ngày bắt đầu"
                                        name="fromDate"
                                        fullWidth
                                        value={formData.fromDate}
                                        onChange={(newValue) =>
                                            setFormData({
                                                ...formData,
                                                fromDate: newValue,
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DatePicker
                                        label="Ngày kết thúc"
                                        name="toDate"
                                        fullWidth
                                        value={formData.toDate}
                                        onChange={(newValue) => {
                                            setFormData({
                                                ...formData,
                                                toDate: newValue,
                                            });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="className"
                                label="Tên lớp"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="ageGroup"
                                label="Nhóm tuổi"
                                type="number"
                                id="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox disabled checked color="primary" />}
                                label="Đặt lịch mặc định"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Tạo lớp
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
