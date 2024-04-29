import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { memo, useState } from 'react';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function Admissions() {
    const [dataForm, setDataForm] = useState({
        'parent-name': '',
        birthdate: null,
        phone: '',
        gender: 'male',
        captcha: '',
    });
    const [error, setError] = useState([]);

    const handleChange = (e, key) => {
        //remove required error
        if (error.includes(key)) {
            setError(error.filter((item) => item !== key));
        }
        setDataForm({ ...dataForm, [key]: e.target.value });
    };
    const handleSubmitAdmissions = () => {
        let arrError = [];
        for (const data in dataForm) {
            if (Object.hasOwnProperty.call(dataForm, data)) {
                if (dataForm[data] === '') {
                    arrError.push(data);
                }
            }
        }
        setError(arrError);
    };
    return (
        <div className={cx('admissions')}>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('container')}
            >
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        inputProps={{ className: cx('text-field') }}
                        id="parent-name"
                        label="Tên phụ huynh"
                        value={dataForm['parent-name']}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'parent-name')}
                        {...(error.includes('parent-name') && { error: true, helperText: 'Vui lòng nhập' })}
                    />
                </Grid>
                <Grid item xs={2.5} className={cx('datePicker')}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DatePicker
                                label="Sinh nhật bé"
                                name="birthdate"
                                slotProps={{ textField: { fullWidth: true, variant: 'filled' } }}
                                value={dataForm.birthdate}
                                onChange={(e) => handleChange(e, 'birthdate')}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        id="phone"
                        label="Số điện thoại"
                        type="number"
                        value={dataForm.phone}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'phone')}
                        {...(error.includes('phone') && { error: true, helperText: 'Vui lòng nhập' })}
                    />
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        id="gender"
                        label="Giới tính trẻ"
                        value={dataForm.gender}
                        fullWidth
                        select
                        variant="filled"
                        onChange={(e) => handleChange(e, 'gender')}
                    >
                        <MenuItem value="male">Bé trai</MenuItem>
                        <MenuItem value="female">Bé gái</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <Button variant="contained" className={cx('button')} onClick={handleSubmitAdmissions}>
                        Đăng ký tư vấn
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default memo(Admissions);
