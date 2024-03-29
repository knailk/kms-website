import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '~/components/Avatar/Avatar';

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
        headerName: 'Avatar',
        width: 150,
        editable: true,
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Avatar src={params.value} width={40} height={40} />
                </div>
            );
        },
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone',
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
        firstName: 'Jon',
        lastName: 'Snow',
        avatar: 'https://mui.com/static/images/avatar/1.jpg',
        email: 'sample1@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
    {
        id: 2,
        firstName: 'Cersei',
        lastName: 'Lannister',
        avatar: 'https://mui.com/static/images/avatar/2.jpg',
        email: 'sample2@gmail.com',
        phone: '0987654321',
        attendence_check: true,
    },
    {
        id: 3,
        firstName: 'Jaime',
        lastName: 'Lannister',
        avatar: 'https://mui.com/static/images/avatar/3.jpg',
        email: 'sample3@gmail.com',
        phone: '0987654321',
        attendence_check: false,
    },
];

export default function DataGridDemo() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
