import * as React from 'react';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Currencies } from '~/constants/currency';
import request from '~/utils/http';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
const cx = classNames.bind(styles);

export default function RegisterClass() {
    const context = React.useContext(LoggedContext);
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        birthDate: null,
        gender: '',
        classID: '',
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
                                id="fullName"
                                label="Họ và tên"
                                name="fullName"
                                value={formData.fullName}
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
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Số điện thoại"
                                name="phoneNumber"
                                type='number'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
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
