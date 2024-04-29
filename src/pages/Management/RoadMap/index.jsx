import { memo, useEffect, useState } from 'react';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import classNames from 'classnames/bind';
import styles from './RoadMap.module.scss';
import SearchBox from '~/components/SearchBox/SearchBox';
import { Button } from '@mui/material';
import StudentInfo from './StudentInfo';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const cx = classNames.bind(styles);

const RoadMap = () => {
    const theme = useTheme();
    const md = useMediaQuery('(min-width: 1190px)');
    const lg = useMediaQuery('(min-width: 1550px)');
    const [position, setPosition] = useState();
    const [listUser, setListUser] = useState([]); // [ {username, name, address, lat, lng}
    const [currentPosition, setCurrentPosition] = useState({ username: 'driver', lat: 10.771765, lng: 106.5671659 });
    const [checked, setChecked] = useState([]);

    const listStudent = [
        {
            username: 'user_id_1',
            name: 'Nguyễn Văn A',
            address: '121 Phạm Văn Bạch, Phường 15, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam',
            lat: 10.8158933,
            lng: 106.6353132,
        },
        {
            username: 'user_id_2',
            name: 'Nguyễn Văn B',
            address: '423 Hà Thị Khiêm, KP2, Quận 12, Thành phố Hồ Chí Minh 700000, Việt Nam',
            lat: 10.853806,
            lng: 106.624934,
        },
        {
            username: 'user_id_3',
            name: 'Nguyễn Văn C',
            address: '12/4B Ấp 1, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam',
            lat: 10.8459868,
            lng: 106.5535158,
        },
        {
            username: 'user_id_4',
            name: 'Nguyễn Văn D',
            address: '1459 Đ. Vĩnh Lộc, Vĩnh Lộc B, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam',
            lat: 10.8012882,
            lng: 106.5623317,
        },
    ];

    const handleOptimize = () => {
        //set position depend on checked
        const newChecked = listUser.filter((item) => checked.includes(item.username));
        setPosition(newChecked);
    };

    useEffect(() => {
        //fetch data user
        setListUser(listStudent);
        setChecked(listStudent.map((item) => item.username));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //on reisze
    return (
        <div className={cx('road-map-container')}>
            <div className={cx('content-left')} style={{ width: lg ? '70%' : md ? '65%' : '100%' }}>
                <GoogleMap type="road-map" position={position} defaultPosition={currentPosition} />
            </div>
            {md && (
                <div className={cx('content-right')} style={{ width: lg ? '27%' : '32%' }}>
                    <div className={cx('action-wrapper')}>
                        <SearchBox style={{ width: '65%' }} />
                        <Button
                            style={{ width: '30%' }}
                            size="small"
                            variant="contained"
                            className={cx('btn-optimize')}
                            onClick={handleOptimize}
                        >
                            Tối ưu
                        </Button>
                    </div>
                    <div className={cx('list-student-wrapper')}>
                        <StudentInfo listStudent={listUser} checked={checked} setChecked={setChecked} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(RoadMap);
