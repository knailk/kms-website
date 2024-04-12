import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import { CameraAlt, School, Work } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar as MuiAvatar } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import PaymentHistory from './PaymentHistory';
import AccountSetting from './AccountSetting';
import PaymentDetail from './PaymentDetail';
const cx = classNames.bind(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3, position: 'relative' }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Profile() {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get('tab') === 'payment' ? 1 : 0);
    const [paymentId, setPaymentId] = useState(
        searchParams.get('payment-number') !== undefined ? searchParams.get('payment-number') : '',
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSearchParams({ tab: newValue === 0 ? 'info' : 'payment' });
    };

    const handleBtnDetail = (paymentNumber) => {
        setPaymentId(paymentNumber);
        searchParams.set('payment-number', paymentNumber);
        setSearchParams(searchParams);
    };

    const handleBtnBack = () => {
        setPaymentId('');
        searchParams.delete('payment-number');
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (searchParams.get('tab') !== 'payment' && searchParams.get('tab') !== 'info') {
            setSearchParams('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h2 className={cx('title')}>Hồ sơ cá nhân</h2>
            <div className={cx('profile-wrapper')}>
                <div className={cx('background')}>
                    <div
                        className={cx('background-top')}
                        style={{ backgroundImage: "url('/images/bg-profile.jpg')" }}
                    ></div>
                </div>
                <div className={cx('profile-content-wrapper')}>
                    <div className={cx('content-left')}>
                        <div className={cx('avatar-wrapper')}>
                            <Avatar
                                src="https://avatars3.githubusercontent.com/u/9384699?s=400&v=4"
                                width={200}
                                height={200}
                            />
                            <div className={cx('icon-camera')}>
                                <CameraAlt />
                            </div>
                        </div>
                        <div className={cx('fixed-infor')}>
                            <div className={cx('group-infor')}>
                                <h3>John Doe</h3>
                            </div>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <MuiAvatar>
                                            <Work />
                                        </MuiAvatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Chức vụ" secondary="Giáo viên" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <MuiAvatar>
                                            <School />
                                        </MuiAvatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Lớp học" secondary="Lớp 1A" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <MuiAvatar>
                                            <BeachAccessIcon />
                                        </MuiAvatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tham gia" secondary="Ngày 20 tháng 10 năm 2024" />
                                </ListItem>
                                <Divider />
                            </List>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <AppBar position="static" style={{ color: 'black', backgroundColor: 'white' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    aria-label="full width tabs example"
                                    bgcolor="white"
                                >
                                    <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                                    <Tab label="Lịch sử thanh toán" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <AccountSetting />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {!paymentId && <PaymentHistory handleBtnDetail={handleBtnDetail} />}
                                {paymentId && (
                                    <PaymentDetail paymentId={paymentId} handleBtnBack={() => handleBtnBack()} />
                                )}
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}
