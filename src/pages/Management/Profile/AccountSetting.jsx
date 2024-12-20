import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import classNames from 'classnames/bind';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import styles from './Profile.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import GoogleMapDialog from './GoogleMapDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import request from '~/utils/http';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function AccountSetting({ userData }) {
    const context = useContext(LoggedContext);
    const [open, setOpen] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const fullNameRef = useRef();
    const parentNameRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const [birthDate, setBirthDate] = useState(dayjs(userData.birthDate));
    const [gender, setGender] = useState(userData.gender);
    const [address, setAddress] = useState({
        address: userData.address,
        lat: userData.latitude,
        lng: userData.longitude,
    });
    console.log(address);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveBtn = () => {
        context.setShowBackDrop(true);
        request
            .put('/profile/me', {
                email: emailRef.current.value,
                fullName: fullNameRef.current.value,
                parentName: parentNameRef.current.value,
                gender: gender,
                phoneNumber: phoneNumberRef.current.value,
                address: address.address,
                latitude: address.lat,
                longitude: address.lng,
                pictureURL: userData.pictureURL,
                birthDate: dayjs(birthDate, 'YYYY-MM-DD').toISOString(),
            })
            .then((res) => {
                setTimeout(() => {
                    context.setShowSnackbar('Lưu thông tin thành công', 'success');
                }, 1000);
            })
            .catch((err) => {
                setTimeout(() => {
                    context.setShowSnackbar('Lưu thông tin thất bại', 'error');
                }, 1000);
            })
            .finally(() => {
                setTimeout(() => {
                    context.setShowBackDrop(false);
                }, 1000);
            });
    };

    useEffect(() => {
        fullNameRef.current.value = userData.fullName;
        parentNameRef.current.value = userData.parentName;
        phoneNumberRef.current.value = userData.phoneNumber;
        emailRef.current.value = userData.email;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {userData && (
                <div className={cx('account-setting-wrapper')}>
                    <div className={cx('text-field-group')}>
                        <TextField
                            sx={{ width: '47%' }}
                            id="standard-basic"
                            label="Tên học sinh"
                            variant="outlined"
                            autoComplete="off"
                            inputRef={fullNameRef}
                        />
                        <TextField
                            sx={{ width: '47%' }}
                            id="standard-basic"
                            label="Tên phụ huynh"
                            variant="outlined"
                            autoComplete="off"
                            inputRef={parentNameRef}
                        />
                    </div>
                    <div className={cx('text-field-group')}>
                        <TextField
                            sx={{ width: '47%' }}
                            id="standard-basic"
                            label="Số điện thoại"
                            variant="outlined"
                            autoComplete="off"
                            inputRef={phoneNumberRef}
                        />
                        <TextField
                            sx={{ width: '47%' }}
                            id="standard-basic"
                            label="Email"
                            variant="outlined"
                            autoComplete="off"
                            inputRef={emailRef}
                        />
                    </div>
                    <div className={cx('text-field-group')}>
                        <FormControl sx={{ width: '47%' }}>
                            {/* <InputLabel id="birth-date">Giới tính</InputLabel> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Ngày sinh"
                                    value={birthDate}
                                    onChange={(value) => setBirthDate(value)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: '47%' }}>
                            <InputLabel id="gender-select">Giới tính</InputLabel>
                            <Select
                                labelId="gender-select"
                                id="demo-simple-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="Male">Nam</MenuItem>
                                <MenuItem value="Female">Nữ</MenuItem>
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
                            onClick={() => setOpen(true)}
                            value={address.address}
                        />
                    </div>
                    <div className={cx('button-wrapper')}>
                        <Button onClick={() => setOpenChangePassword(true)} color="primary" variant="contained">
                            Đổi mật khẩu
                        </Button>
                        <Button onClick={() => handleSaveBtn()} color="primary" variant="contained">
                            Lưu thông tin
                        </Button>
                    </div>
                    <GoogleMapDialog address={address} setAddress={setAddress} open={open} handleClose={handleClose} />
                    <ChangePasswordDialog open={openChangePassword} onClose={() => setOpenChangePassword(false)} />
                </div>
            )}
        </>
    );
}

export default AccountSetting;
