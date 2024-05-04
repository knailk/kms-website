import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Alert from '@mui/material/Alert';
import 

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import request from '~/utils/http';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
const cx = classNames.bind(styles);

export default function RegisterClass() {
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [matchPassword, setMatchPassword] = React.useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(false);
    const [classes, setClasses] = React.useState([]);
    const [formData, setFormData] = React.useState({
        username: '',
        fullName: '',
        parentName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        birthDate: null,
        gender: '',
        classID: '',
        accepted: false,
    });

    React.useEffect(() => {
        request
            .get('/classes?limit=100&page=1')
            .then((response) => {
                setClasses(response.data.classes);
            })
            .catch((error) => {
                // context.setShowSnackbar('Không tìm thấy thông tin lớp học', 'error');
                <Alert severity="error">Không tìm thấy thông tin lớp học</Alert>;
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMatchPassword(false);
            return;
        } else {
            setMatchPassword(true);
        }

        request
            .post('/auth/register', formData)
            .then((response) => {
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Đăng ký lớp học
                    </Alert>
                </Snackbar>;
            })
            .catch((error) => {
                <Alert severity="error">Đăng ký không thành công</Alert>;
            });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <Typography
                    style={{
                        fontSize: '26px',
                        fontWeight: '800',
                        fontFamily: '"Nunito", sans-serif',
                        color: '#545454',
                    }}
                >
                    Đăng ký ghi danh
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên bé"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="parentName"
                                label="Họ và tên phụ huynh"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Tên đăng nhập"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Số điện thoại"
                                name="phoneNumber"
                                type="number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                error={matchPassword ? false : true}
                                helperText={matchPassword ? null : 'Mật khẩu không chính xác'}
                                type={isShowPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(event) => setIsShowPassword(!isShowPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                error={matchPassword ? false : true}
                                helperText={matchPassword ? null : 'Mật khẩu không chính xác'}
                                type={isShowConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(event) => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {isShowConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        name="birthDate"
                                        slotProps={{ textField: { fullWidth: true, required: true } }}
                                        value={formData.birthDate}
                                        onChange={(newValue) =>
                                            setFormData({
                                                ...formData,
                                                birthDate: newValue,
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="gender"
                                select
                                fullWidth
                                required
                                label="Giới tính bé"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <MenuItem key="male" value="male">
                                    Bé trai
                                </MenuItem>
                                <MenuItem key="female" value="female">
                                    Bé gái
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="classID"
                                select
                                fullWidth
                                required
                                label="Lớp học"
                                value={formData.classID}
                                onChange={handleChange}
                            >
                                {classes.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.className}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                required
                                control={
                                    <Checkbox
                                        color="default"
                                        onClick={(e) => setFormData({ ...formData, accepted: e.target.checked })}
                                    />
                                }
                                label="Tôi đồng ý với các chính sách và bảo mật của nền tảng"
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
