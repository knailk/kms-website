import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { memo, useState } from 'react';
const cx = classNames.bind(styles);

function Admissions() {
    const [dataForm, setDataForm] = useState({
        'parent-name': '',
        'child-age': '',
        phone: '',
        branch: 'cs1',
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
        <>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('admissions')}
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
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        id="child-age"
                        label="Độ tuổi trẻ"
                        type="number"
                        value={dataForm['child-age']}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'child-age')}
                        {...(error.includes('child-age') && { error: true, helperText: 'Vui lòng nhập' })}
                    />
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
                        id="branch"
                        label="Chọn cơ sở"
                        type="number"
                        value={dataForm.branch}
                        select
                        variant="filled"
                        onChange={(e) => handleChange(e, 'branch')}
                    >
                        <MenuItem value="cs1">Cơ sở Tân Phú</MenuItem>
                        <MenuItem value="cs2">Cơ sở Tân Bình</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        id="captcha"
                        label="12 + 5 = ?"
                        type="number"
                        value={dataForm.captcha}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'captcha')}
                        {...(error.includes('captcha') && { error: true, helperText: 'Vui lòng nhập' })}
                    />
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <Button variant="contained" className={cx('button')} onClick={handleSubmitAdmissions}>
                        Đăng ký tư vấn
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default memo(Admissions);
