import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';

const cx = classNames.bind(styles);

function Admissions() {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        parent_name: '',
        children_name: '',
        phone: '',
        gender: 'male',
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

        if (arrError.length > 0) {
            setError(arrError);
        } else {
            const query = qs.stringify(dataForm);
            console.log('11111', query);
            navigate(`/course?${query}#register-form`);
        }
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
                        value={dataForm['parent_name']}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'parent_name')}
                        {...(error.includes('parent_name') && { error: true, helperText: 'Vui lòng nhập' })}
                    />
                </Grid>
                <Grid item xs={2} className={cx('')}>
                    <TextField
                        inputProps={{ className: cx('text-field') }}
                        id="children-name"
                        label="Tên bé"
                        value={dataForm['children_name']}
                        variant="filled"
                        onChange={(e) => handleChange(e, 'children_name')}
                        {...(error.includes('children_name') && { error: true, helperText: 'Vui lòng nhập' })}
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
