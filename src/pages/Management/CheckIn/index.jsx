import React from 'react';
import { Button, Snackbar, Checkbox } from '@mui/material';
import classNames from 'classnames/bind';
import { Cancel, CheckCircle } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import styles from './CheckIn.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import request from '~/utils/http';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import dayjs from 'dayjs';
import _ from 'lodash';

const cx = classNames.bind(styles);

const CheckInDashboard = () => {
    const context = React.useContext(LoggedContext);
    const snackBarRef = React.useRef(false);

    const [state, setState] = React.useState({
        students: [],
        checkInStudents: [],
        checkedInSet: new Set(), // History checked in
        checkInSet: new Set(), // Current check in
    });

    const getWeekStartDate = React.useCallback((date = dayjs()) => {
        const day = date.day() !== 0 ? date.day() : 7;
        return date.startOf('week').add(day === 7 ? -6 : 1, 'day');
    }, []);

    const [weekStartDate, setWeekStartDate] = React.useState(getWeekStartDate());

    const getCheckedInKey = React.useCallback((userClassID, date) => `${userClassID}_${date}`, []);

    const handleSetCheckedIn = React.useCallback(
        (histories) => {
            const newCheckedInSet = new Set(state.checkedInSet);
            _.forEach(histories, (history) => {
                _.forEach(history.checkInOuts, (checkInOut) => {
                    newCheckedInSet.add(getCheckedInKey(history.userClassID, checkInOut.date));
                });
            });
            setState((prevState) => ({
                ...prevState,
                checkedInSet: newCheckedInSet,
            }));
        },
        [getCheckedInKey, state.checkedInSet],
    );

    const fetchWeekData = React.useCallback(
        (startDate) => {
            const fromDate = startDate.format('YYYYMMDD');
            const toDate = startDate.add(7, 'days').format('YYYYMMDD');
            request
                .get(`/class/me`)
                .then((response) => {
                    request
                        .get(`/class/${response.data.id}/check-in-out/history`, {
                            params: { fromDate, toDate },
                        })
                        .then((res) => {
                            setState((prevState) => ({
                                ...prevState,
                                students: res.data.histories,
                            }));
                            handleSetCheckedIn(res.data.histories);
                        })
                        .catch((error) => {
                            context.setShowSnackbar('Tìm thông tin thành viên không thành công', 'error');
                        });
                })
                .catch((error) => {
                    context.setShowSnackbar('Tìm thông tin lớp học không thành công', 'error');
                });
        },
        [weekStartDate, handleSetCheckedIn],
    );

    React.useEffect(() => {
        fetchWeekData(weekStartDate);
    }, [weekStartDate]);

    const handleWeekChange = (weeksToAdd) => {
        setWeekStartDate(weekStartDate.add(weeksToAdd, 'week'));
    };

    const handleSelectCheckIn = React.useCallback(
        (student, date) => {
            setState((prevState) => {
                const exist = _.some(prevState.checkInStudents, { userClassID: student.userClassID, date });
                let updatedStudents;
                if (exist) {
                    updatedStudents = prevState.checkInStudents.filter(
                        (entry) => !(entry.userClassID === student.userClassID && entry.date === date),
                    );
                } else {
                    updatedStudents = [...prevState.checkInStudents, { userClassID: student.userClassID, date }];
                }

                snackBarRef.current = updatedStudents.length > 0;

                const key = getCheckedInKey(student.userClassID, date);
                const newSet = new Set(prevState.checkInSet);
                newSet.has(key) ? newSet.delete(key) : newSet.add(key);

                return {
                    ...prevState,
                    checkInStudents: updatedStudents,
                    checkInSet: newSet,
                };
            });
        },
        [getCheckedInKey],
    );

    const handleCheckIn = React.useCallback(
        (check) => {
            if (check) {
                request
                    .post(`/class/check-in-out`, {
                        action: 'check_in',
                        checkInOuts: state.checkInStudents,
                    })
                    .then(() => {
                        fetchWeekData(weekStartDate);
                    })
                    .catch((error) => {
                        context.setShowSnackbar('Điểm danh không thành công', 'error');
                    });
            }

            setState((prevState) => ({
                ...prevState,
                checkInStudents: [],
                checkInSet: new Set(),
            }));

            snackBarRef.current = false;
        },
        [context, state.checkInStudents, weekStartDate, fetchWeekData],
    );

    const columns = [
        {
            field: 'fullName',
            headerName: 'Tên học sinh',
            width: 200,
            renderCell: (params) => {
                return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={params.row.pictureURL} name={params.row.username} />
                        <Typography variant="body1">{params.row.fullName}</Typography>
                    </Stack>
                );
            },
        },
        ...['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, index) => ({
            field: `day${index + 1}`,
            headerName: day,
            width: 150,
            renderCell: (params) => {
                console.log('render');
                const date = +weekStartDate.add(index, 'day').format('YYYYMMDD');
                const checked = state.checkedInSet.has(getCheckedInKey(params.row.userClassID, date));
                const check = state.checkInSet.has(getCheckedInKey(params.row.userClassID, date));
                return (
                    <Checkbox
                        disabled={checked}
                        checked={checked || check}
                        onChange={() => handleSelectCheckIn(params.row, date)}
                        style={{
                            backgroundColor: date === +dayjs().format('YYYYMMDD') ? '#bde0ff' : 'transparent',
                        }}
                    />
                );
            },
        })),
    ];

    const rows = state.students.map((student, index) => ({
        id: index,
        ...student,
    }));

    const fromDate = weekStartDate.format('DD/MM');
    const toDate = weekStartDate.add(6, 'days').format('DD/MM');

    const Snack = () => {
        return (
            <div className={cx('snack-wrapper')}>
                <div onClick={() => handleCheckIn(false)}>
                    <Cancel className={cx('icon-cancel')} />
                    <span className={cx('text')}>Huỷ bỏ</span>
                </div>
                <div onClick={() => handleCheckIn(true)}>
                    <CheckCircle className={cx('icon-check')} />
                    <span className={cx('text')}>Điểm danh</span>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" onClick={() => handleWeekChange(-1)}>
                    Tuần trước
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setWeekStartDate(getWeekStartDate())}
                    style={{ marginLeft: '10px' }}
                >
                    Hôm nay
                </Button>
                <Button variant="contained" onClick={() => handleWeekChange(1)} style={{ marginLeft: '10px' }}>
                    Tuần sau
                </Button>
                <div style={{ marginLeft: '20px' }}>{`Từ ngày ${fromDate} - Đến này ${toDate}`}</div>
            </div>

            <div style={{ height: 'calc(100vh - 220px)', width: '100%' }}>
                <DataGrid getRowId={(row) => row.username} rows={rows} columns={columns} />
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackBarRef.current}
                onClose={() => (snackBarRef.current = false)}
                message={<Snack />}
                sx={{
                    padding: '2px 8px',
                    minWidth: '240px',
                    '& .MuiSnackbarContent-message': { width: '100%', padding: '4px 0px' },
                }}
            />
        </div>
    );
};

export default CheckInDashboard;
