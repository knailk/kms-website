import React, { useEffect } from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import request from '~/utils/http';
import moment from 'moment';

const cx = classNames.bind(styles);

// Header Component
function MenuHeader() {
    return (
        <div
            className={cx('banner-wrapper')}
            style={{
                backgroundImage: "url('images/backgroundhome.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('banner-content')}
            >
                <Grid item xs={5} className={cx('bread-crums')}>
                    Trang chủ {'>>'} Thực đơn
                </Grid>
                <Grid item xs={7}></Grid>
                <Grid item xs={5} className={cx('banner')}>
                    <div className={cx('title')}>
                        <p>"Khám phá thực đơn dinh dưỡng cho tuần này tại Smart Kindergarten"</p>
                    </div>
                    <Button variant="contained" className={cx('button')}>
                        Xem Thêm
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={7}
                    style={{
                        backgroundImage: "url('images/bgbanner.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '60%',
                        backgroundPositionY: '-161px',
                        backgroundPositionX: '250px',
                    }}
                ></Grid>
            </Grid>
        </div>
    );
}

// Table Component
function MenuTable({ dishes }) {
    const headers = ['Bữa sáng', 'Ăn nhẹ', 'Bữa trưa', 'Bữa xế chiều', 'Bữa chiều'];
    const mealKeys = ['breakfast', 'eatLightly', 'lunch', 'afternoonSnack', 'dinner'];

    return (
        <TableContainer component={Paper} className={cx('table-container')}>
            <Table aria-label="meal schedule table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}
                        ></TableCell>
                        {headers.map((header, index) => (
                            <TableCell
                                key={index}
                                align="center"
                                style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dishes.map((dish, index) => (
                        <TableRow
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternating row colors
                            }}
                        >
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                {dish.dayOfWeek}
                            </TableCell>
                            {mealKeys.map((mealKey, idx) => (
                                <TableCell key={idx} align="center" style={{ padding: '12px' }}>
                                    {dish[mealKey]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Main Menu Page Component
function Menu() {
    const monday = moment().startOf('week');
    const friday = moment(monday).add(4, 'days');

    const [dishes, setDishes] = React.useState([]);

    useEffect(() => {
        request
            .get('dishes/week', {
                params: {
                    fromDate: +monday.format('YYYYMMDD'),
                    toDate: +friday.format('YYYYMMDD'),
                },
            })
            .then((res) => setDishes(res?.data?.dishes))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('menu-page')}>
            <MenuHeader />
            <h2 className={cx('page-title')}>Thực đơn hàng tuần</h2>
            <p className={cx('date-range')}>
                {monday.format('DD/MM')} - {friday.format('DD/MM')}
            </p>
            <MenuTable dishes={dishes} />
        </div>
    );
}

export default Menu;
