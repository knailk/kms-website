import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import SearchBox from '~/components/SearchBox/SearchBox';
import ToTime from '~/utils/convertDateFormat';
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
        valueGetter: (value, row) => ToTime(row.fromDate),
    },
    {
        field: 'toDate',
        headerName: 'Ngày kết thúc',
        width: 200,
        editable: true,
        valueGetter: (value, row) => ToTime(row.toDate),
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
        editable: true,
        renderCell: (params) => {
            const status = params.value;
            if (status === 'active') {
                return <Chip label={status} color="success" />;
            } else {
                return <Chip label={status} color="primary" />;
            }
        },
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
        valueGetter: (value, row) => `${row.price || 0} ${row.currency || 'VND'}`,
    }
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
        status: 'inactive',
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
