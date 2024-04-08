import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import { CameraAlt } from '@mui/icons-material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PaymentHistory from './PaymentHistory';
import AccountSetting from './AccountSetting';
import { useState } from 'react';
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
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
                                width={300}
                                height={300}
                            />
                            <div className={cx('icon-camera')}>
                                <CameraAlt />
                            </div>
                        </div>
                        <div className={cx('user-name')}>
                            <h3>Trần Minh Toàn</h3>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <Box sx={{ width: '100%' }}>
                            <AppBar position="static" style={{ color: 'black', backgroundColor: 'white' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="black"
                                    aria-label="full width tabs example"
                                    bgcolor="white"
                                >
                                    <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                                    <Tab label="Lịch sử thanh toán" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <AccountSetting />
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <PaymentHistory />
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}
