import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import classNames from 'classnames/bind';
import { FeedBackContext } from '~/components/Layout/LoggedLayout';
import styles from './Profile.module.scss';
import { useContext, useState } from 'react';

const cx = classNames.bind(styles);

function AccountSetting() {
    const [gender, setGender] = useState('');
    const context = useContext(FeedBackContext);

    const handleSaveBtn = () => {
        context.setShowBackDrop(true);
        setTimeout(() => {
            context.setShowBackDrop(false);
            context.setShowSnackbar('Lưu thông tin thành công', 'success');
        }, 1000);
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className={cx('account-setting-wrapper')}>
            <div className={cx('text-field-group')}>
                <TextField sx={{ width: '47%' }} id="standard-basic" label="Họ" variant="outlined" autoComplete="off" />
                <TextField
                    sx={{ width: '47%' }}
                    id="standard-basic"
                    label="Tên"
                    variant="outlined"
                    autoComplete="off"
                />
            </div>
            <div className={cx('text-field-group')}>
                <TextField
                    sx={{ width: '47%' }}
                    id="standard-basic"
                    label="Số điện thoại"
                    variant="outlined"
                    autoComplete="off"
                />
                <TextField
                    sx={{ width: '47%' }}
                    id="standard-basic"
                    label="Email"
                    variant="outlined"
                    autoComplete="off"
                />
            </div>
            <div className={cx('text-field-group')}>
                <TextField
                    style={{ width: '47%' }}
                    id="standard-basic"
                    label="Ngày sinh"
                    variant="outlined"
                    autoComplete="off"
                />
                <FormControl sx={{ width: '47%' }}>
                    <InputLabel id="gender-select">Giới tính</InputLabel>
                    <Select
                        labelId="gender-select"
                        id="demo-simple-select"
                        value={gender}
                        label="Giới tính"
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Nam</MenuItem>
                        <MenuItem value="female">Nữ</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={cx('text-field-group')}>
                <TextField
                    sx={{ width: '100%' }}
                    id="standard-basic"
                    label="Địa chỉ"
                    variant="outlined"
                    autoComplete="off"
                />
            </div>
            <div className={cx('button-wrapper')}>
                <Button variant="contained" onClick={() => handleSaveBtn()}>
                    Lưu thông tin
                </Button>
            </div>
        </div>
    );
}

export default AccountSetting;
