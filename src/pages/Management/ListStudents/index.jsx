import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ListStudents.module.scss';
import { DatePicker } from 'rsuite'; 
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '~/components/Avatar/Avatar';
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';
import SearchBox from '~/components/SearchBox/SearchBox';
const cx = classNames.bind(styles);

const columns = [
    {
        field: 'id',
        headerName: 'Email',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.email,
    },
    {
        field: 'avatar',
        headerName: 'Họ và tên',
        width: 300,
        editable: true,
        valueGetter: (value, row) => ({ src: value, name: row.fullName }),
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Avatar src={params.value.src} width={40} height={40} />
                    <span style={{ marginLeft: 20 }}>{params.value.name}</span>
                </div>
            );
        },
    },

    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 150,
        editable: true,
    },
    {
        field: 'attendence_check',
        headerName: 'Attendence Check',
        width: 200,
        editable: true,
    },
];

const rows = [
    {
        id: 1,
        fullName: 'Jon Snow',
        avatar: 'https://mui.com/static/images/avatar/1.jpg',
        email: 'sample1@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 2,
        fullName: 'Cersei Lannister',
        avatar: 'https://mui.com/static/images/avatar/2.jpg',
        email: 'sample2@gmail.com',
        phone: '0987654321',
        attendence_check: true,
    },
    {
        id: 3,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample3@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 4,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample4@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 5,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample5.@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 6,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 7,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 8,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 9,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 10,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 11,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 12,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 13,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 14,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 15,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 16,
        fullName: 'Jaime Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
];

export default function ListStudents() {
    //state
    const snackBarRef = React.useRef(false);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [backdrop, setBackdrop] = React.useState(false);

    //button handler

    //api call
    const handleAttendenceCheck = (type) => {
        snackBarRef.current = false;
        setBackdrop(true);
        setTimeout(() => {
            setBackdrop(false);
            setRowSelectionModel([]);
        }, 1000);
    };

    //render
    const Snack = () => {
        return (
            <div className={cx('snack-wrapper')}>
                <div onClick={() => handleAttendenceCheck('check')}>
                    <CheckCircle className={cx('icon-check')} />
                    <span className={cx('text')}>Có mặt</span>
                </div>
                <div onClick={() => handleAttendenceCheck('uncheck')}>
                    <Cancel className={cx('icon-cancel')} />
                    <span className={cx('text')}>Vắng mặt</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <h2 className={cx('title')}>Danh sách học sinh</h2>
            <div className={cx('search-wrapper')}>
                <SearchBox placeholder="Tìm kiếm học sinh" style={{ width: '50%' }} />
                <DatePicker style={{ width: '40%' }} />
            </div>
            <div style={{ height: 'calc(100vh - 196px)', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        snackBarRef.current = newRowSelectionModel.length > 0;
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </div>
            <Backdrop open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

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
        </>
    );
}
