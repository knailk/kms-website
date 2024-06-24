import * as React from 'react';
import classNames from 'classnames/bind';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button } from '@mui/material';
import request from '~/utils/http';
import SchoolIcon from '@mui/icons-material/School';
import dayjs from 'dayjs';

import styles from './Request.module.scss';

const cx = classNames.bind(styles);

export default function Request() {
    const context = React.useContext(LoggedContext);
    const [classSelected, setClassSelected] = React.useState({});
    const [classes, setClasses] = React.useState([]);
    const [registerForm, setRegisterForm] = React.useState([]);

    const columns = [
        {
            field: 'fullName',
            headerName: 'Họ và tên',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row.fullName,
        },
        {
            field: 'parentName',
            headerName: 'Phụ huynh',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row.parentName,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true,
            valueGetter: (value, row) => row.email,
        },
        {
            field: 'phoneNumber',
            headerName: 'Số điện thoại',
            width: 150,
            valueGetter: (value, row) => row.phoneNumber,
            editable: true,
        },
        {
            field: 'gender',
            headerName: 'Giới tính',
            width: 100,
            editable: false,
            valueGetter: (value, row) => row.gender,
        },
        {
            field: 'className',
            headerName: 'Lớp học',
            width: 200,
            editable: false,
            valueGetter: (value, row) => row.class.className,
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 100,
            editable: false,
            renderCell: (params) => {
                const status = params.value;
                var color = 'success';
                switch (status) {
                    case 'approved':
                        color = 'success';
                        break;
                    case 'pending':
                        color = 'primary';
                        break;
                    case 'rejected':
                        color = 'error';
                        break;
                    default:
                        break;
                }

                return <Chip label={status} color={color} variant="outlined" />;
            },
        },
        {
            field: 'createdAt',
            headerName: 'Tham gia vào',
            width: 200,
            align: 'center',
            editable: false,
            valueGetter: (value, row) => dayjs(row.createdAt).format('YYYY/MM/DD HH:mm:ss A'),
        },
        {
            field: 'trigger',
            headerName: 'Hành động',
            width: 100,
            align: 'center',
            editable: false,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => rejectForm(params.row.id, 'rejected')}
                            disabled={params.row.status !== 'pending'}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                        <IconButton
                            aria-label="approve"
                            color="success"
                            onClick={() => rejectForm(params.row.id, 'approve')}
                            disabled={params.row.status !== 'pending'}
                        >
                            <CheckBoxIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const rejectForm = (id, action) => {
        request
            .post(`admin/auth/register-confirm`, {
                id: id,
                action: action,
            })
            .then((response) => {
                context.setShowSnackbar('Cập nhật thành công', 'success');
            })
            .catch((error) => {
                context.setShowSnackbar('Cập nhật không thành công', 'error');
            });
    };

    React.useEffect(() => {
        request
            .get(`admin/class?page=1&limit=10`)
            .then((response) => {
                setClasses(response.data.classes);
                setClassSelected(response.data.classes[0]);
            })
            .catch((error) => {
                context.setShowSnackbar('Không tìm thấy thông tin lớp học', 'error');
            });
    }, []);

    React.useEffect(() => {
        request
            .get(`admin/auth/register-request-list`)
            .then((res) => {
                setRegisterForm(res.data.registerList);
            })
            .catch((error) => {
                context.setShowSnackbar('Tìm thông tin đơn đăng ký không thành công', 'error');
            });
    }, []);

    return (
        <>
            <h2 className={cx('title')}>Yêu cầu tham gia lớp học</h2>
            <div className={cx('request-wrapper')}>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                        <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                            <InputLabel id="demo-simple-select-label">Chọn lớp</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={classSelected}
                                label="Chọn lớp"
                                onChange={(event) => {
                                    setClassSelected(event.target.value);
                                }}
                            >
                                {classes.map((classMap) => (
                                    <MenuItem key={classMap.id} value={classMap}>
                                        {classMap.className}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" startIcon={<SchoolIcon />} onClick={() => {}}>
                            Tạo lớp mới
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            startIcon={<PersonRemoveIcon />}
                            color="error"
                            style={{ marginRight: '5px' }}
                            onClick={() => {}}
                        >
                            Xoá thành viên
                        </Button>

                        <Button variant="contained" startIcon={<PersonAddAlt1Icon />} onClick={() => {}}>
                            Thêm thành viên
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ height: 'calc(90vh - 196px)', width: '100%' }}>
                <DataGrid
                    rows={registerForm}
                    columns={columns}
                    getRowId={(row) => row.id}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: 'createdAt',
                                    sort: 'desc',
                                },
                            ],
                        },
                        pagination: { paginationModel: { page: 0, pageSize: 20 } },
                        density: 'compact',
                    }}
                />
            </div>
        </>
    );
}
