import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
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
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAlert } from '~/components/Layout/DefaultLayout/AlertProvider';
import request from '~/utils/http';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import { useSearchParams } from "react-router-dom";
const cx = classNames.bind(styles);

const phoneRegExp =
    /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = yup.object({
    username: yup
        .string()
        .min(4, 'Tên đăng nhập từ 4 ký tự')
        .matches(/^[a-z0-9_\.]+$/, 'Tên đăng nhập không hợp lệ')
        .required('Tên đăng nhập bắt buộc'),
    password: yup
        .string()
        .min(8, 'Mật khẩu quá ngắn')
        .max(32, 'Mật khẩu quá dài')
        .matches(/[a-zA-Z]/, 'Mật khẩu chỉ bao gồm kí tự thường hoặc in hoa')
        .required('Mật khẩu bắt buộc'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
    fullName: yup.string().required('Họ và tên bé bắt buộc'),
    parentName: yup.string().required('Họ và tên phụ huynh bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email bắt buộc'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại bắt buộc'),
    birthDate: yup.date('Ngày sinh không hợp lệ').required('Ngày sinh bắt buộc'),
    gender: yup.string().required('Giới tính bắt buộc'),
    classID: yup.string().required('Lớp học bắt buộc'),
    accepted: yup.bool().oneOf([true], 'Bắt buộc được chọn'),
});

export default function RegisterClass({ classes }) {
    const [searchParams] = useSearchParams();
    searchParams.get('__firebase_request_key');

    const showAlert = useAlert();
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(false);
    const [waiting, setWaiting] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: searchParams.get("children_name"),
            parentName: searchParams.get("parent_name"),
            password: '',
            confirmPassword: '',
            email: '',
            phoneNumber: searchParams.get("phone"),
            birthDate: null,
            gender: searchParams.get("gender"),
            classID: '',
            accepted: false,
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            setWaiting(true);
            await request
                .post('/auth/register', { ...values, phoneNumber: values.phoneNumber.toString() })
                .then((response) => {
                    showAlert('Đăng ký thành công', 'success');
                })
                .catch((error) => {
                    showAlert('Đăng ký không thành công', 'error');
                });
            setWaiting(false);
        },
        enableReinitialize: true,
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="lg" id="register-form">
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
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên bé"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="parentName"
                                label="Họ và tên phụ huynh"
                                name="parentName"
                                value={formik.values.parentName}
                                onChange={formik.handleChange}
                                error={formik.touched.parentName && Boolean(formik.errors.parentName)}
                                helperText={formik.touched.parentName && formik.errors.parentName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Tên đăng nhập"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Số điện thoại"
                                name="phoneNumber"
                                // type="number"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        name="birthDate"
                                        format="DD/MM/YYYY"
                                        value={formik.values.birthDate}
                                        onChange={(value) => formik.setFieldValue('birthDate', value, true)}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                required: true,
                                                error: formik.touched.birthDate && Boolean(formik.errors.birthDate),
                                                helperText: formik.touched.birthDate && formik.errors.birthDate,
                                            },
                                        }}
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
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
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
                                value={formik.values.classID}
                                onChange={formik.handleChange}
                                error={formik.touched.classID && Boolean(formik.errors.classID)}
                                helperText={formik.touched.classID && formik.errors.classID}
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
                                        onClick={(e) => formik.setFieldValue('accepted', e.target.checked, true)}
                                    />
                                }
                                label="Tôi đồng ý với các chính sách và bảo mật của nền tảng"
                            />
                            <FormHelperText error={formik.touched.accepted && Boolean(formik.errors.accepted)}>
                                {formik.touched.accepted && formik.errors.accepted}
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Button disabled={waiting} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {!waiting ? 'Đăng ký' : 'Đang đăng ký...'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
