import { createContext, useContext, useEffect, useState } from 'react';
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
import request from '~/utils/http';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
const cx = classNames.bind(styles);

export const ProfileContext = createContext();

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
    const context = useContext(LoggedContext);
    const [userData, setUserData] = useState();
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
        // call api get data user
        getDataProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataProfile = async () => {
        context.setShowBackDrop(true);
        await request
            .get('/profile/me')
            .then((res) => {
                let role = '';
                switch (res.data.role) {
                    case 'teacher':
                        role = 'Giáo viên';
                        break;
                    case 'parent':
                        role = 'Phụ huynh';
                        break;
                    case 'driver':
                        role = 'Tài xế';
                        break;
                    default:
                        break;
                }
                let date = new Date(res.data.createdAt);
                let formattedDate = `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
                let firstName = res.data.fullName.split(' ')[0];
                let lastName = res.data.fullName.split(firstName)[1];
                let birthDate = new Date(res.data.birthDate);
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                birthDate.toLocaleDateString('en-US', options);
                setUserData({
                    ...res.data,
                    role: role,
                    createdAt: formattedDate,
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: birthDate,
                });
            })
            .catch((err) => {
                context.setShowSnackbar('Có lỗi xảy ra ', 'error');
            });
        setTimeout(() => {
            context.setShowBackDrop(false);
        }, 500);
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
                            <Avatar src={userData?.pictureURL} width={200} height={200} />
                            <div className={cx('icon-camera')}>
                                <CameraAlt />
                            </div>
                        </div>
                        <div className={cx('fixed-infor')}>
                            <div className={cx('group-infor')}>
                                <h3>{userData?.username}</h3>
                            </div>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <MuiAvatar>
                                            <Work />
                                        </MuiAvatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Chức vụ" secondary={userData?.role} />
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
                                    <ListItemText primary="Tham gia" secondary={userData?.createdAt} />
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
                                {userData && <AccountSetting userData={userData} />}
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
