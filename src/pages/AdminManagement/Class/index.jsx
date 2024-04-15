import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';
import SearchBox from '~/components/SearchBox/SearchBox';
const cx = classNames.bind(styles);

const columns = [
    {
        field: 'teacherID',
        headerName: 'Giáo viên',
        width: 100,
        editable: true,
        valueGetter: (value, row) => row.teacherID,
    },
    {
        field: 'driverID',
        headerName: 'Tài xế',
        width: 100,
        editable: true,
        valueGetter: (value, row) => row.driverID,
    },
    {
        field: 'fromDate',
        headerName: 'Ngày bắt đầu',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.fromDate,
    },
    {
        field: 'toDate',
        headerName: 'Ngày kết thúc',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.toDate,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.status,
    },
    {
        field: 'className',
        headerName: 'Tên lớp',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.className,
    },
    {
        field: 'price',
        headerName: 'Giá vào lớp',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.price,
    },
    {
        field: 'currency',
        headerName: 'Đơn vị',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.currency,
    },
];

const rows = [
    {
        id: 1,
        teacherID: 'teacher',
        driverID: 'driver',
        fromDate: 20240101,
        toDate: 20240430,
        status: 'active',
        className: 'Lop 5 tuoi',
        ageGroup: 5,
        price: 100,
        currency: 'USD',
    },
    {
        id: 2,
        teacherID: 'teacher',
        driverID: 'driver',
        fromDate: 20240101,
        toDate: 20240430,
        status: 'active',
        className: 'Lop 5 tuoi',
        ageGroup: 5,
        price: 100,
        currency: 'USD',
    },
];

export default function Class() {
    return (
        <>
            <h2 className={cx('title')}>Danh sách lớp học</h2>
            <div className={cx('search-wrapper')}>
                <SearchBox placeholder="Tìm kiếm lớp học" style={{ width: '50%' }} />
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
                />
            </div>
        </>
    );
}
