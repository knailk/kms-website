import TextField from '@mui/material/TextField';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

function AccountSetting() {
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
                    sx={{ width: '47%' }}
                    id="standard-basic"
                    label="Standard"
                    variant="outlined"
                    autoComplete="off"
                />
                <TextField
                    sx={{ width: '47%' }}
                    id="standard-basic"
                    label="Standard"
                    variant="outlined"
                    autoComplete="off"
                />
            </div>
        </div>
    );
}

export default AccountSetting;
