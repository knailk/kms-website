import React, { memo } from 'react';
import Map from './Map';
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

    const key = process.env.API_KEY_GOOGLE_MAP;
    //on reisze
    return (
        <div className={cx('road-map-container')}>
            <div className={cx('content-left')} style={{ width: lg ? '70%' : md ? '60%' : '100%' }}>
                {/* <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key ?? ''}&callback=initMap`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%`, margin: `auto`, border: '1px solid black' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                /> */}
            </div>
            {md && (
                <div className={cx('content-right')} style={{ width: lg ? '27%' : '37%' }}>
                    <div className={cx('action-wrapper')}>
                        <SearchBox style={{ width: '65%' }} />
                        <Button
                            style={{ width: '30%' }}
                            size="small"
                            variant="contained"
                            className={cx('btn-optimize')}
                        >
                            Tối ưu
                        </Button>
                    </div>
                    <div className={cx('list-student-wrapper')}>
                        <StudentInfo />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(RoadMap);
