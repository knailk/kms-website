import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ListStudents.module.scss';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '~/components/Avatar/Avatar';
import { Backdrop, CircularProgress, Snackbar, Chip } from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';
import SearchBox from '~/components/SearchBox/SearchBox';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import dayjs from 'dayjs';
import request from '~/utils/http';
const cx = classNames.bind(styles);

const columns = [
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        valueGetter: (value, row) => row.email,
    },
    {
        field: 'avatar',
        headerName: 'Photo',
        width: 50,
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Avatar src={params.value} width={40} height={40} />
                </div>
            );
        },
    },
    {
        field: 'fullName',
        headerName: 'Họ và tên',
        width: 200,
        valueGetter: (value, row) => row.fullName,
    },
    {
        field: 'phoneNumber',
        headerName: 'Số điện thoại',
        width: 150,
        valueGetter: (value, row) => row.phoneNumber,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ',
        width: 200,
        valueGetter: (value, row) => row.address,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
        renderCell: (params) => {
            const status = params.value;
            var color = 'success';
            switch (status) {
                case 'studying':
                    color = 'success';
                    break;
                case 'joined':
                    color = 'primary';
                    break;
                case 'completed':
                    color = 'warning';
                    break;
                case 'canceled':
                    color = 'error';
                    break;
                default:
                    break;
            }

            return <Chip label={status} color={color} variant="outlined" />;
        },
    },
    {
        field: 'joinedAt',
        headerName: 'Tham gia vào',
        width: 200,
        align: 'center',
        valueGetter: (value, row) => dayjs(row.joinedAt).format('YYYY/MM/DD HH:mm:ss A'),
    },
    {
        field: 'check_in',
        headerName: 'Điểm danh',
        width: 200,
    },
];

export default function ListStudents() {
    //state
    const snackBarRef = React.useRef(false);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [members, setMembers] = React.useState([]);

    const context = React.useContext(LoggedContext);

    React.useEffect(() => {
        request
            .get(`/class/me`)
            .then((response) => {
                request
                    .get(`/class/${response.data.id}/members`)
                    .then((res) => {
                        setMembers(res.data.users);
                    })
                    .catch((error) => {
                        context.setShowSnackbar('Tìm thông tin thành viên không thành công', 'error');
                    });
            })
            .catch((error) => {
                context.setShowSnackbar('Tìm thông tin lớp học không thành công', 'error');
            });
    }, []);

    //button handler

    //api call
    const handleCheckIn = (action) => {
        snackBarRef.current = false;
        context.setShowBackDrop(true);
        setTimeout(() => {
            context.setShowBackDrop(false);
            setRowSelectionModel([]);
        }, 1000);
    };

    //render
    const Snack = () => {
        return (
            <div className={cx('snack-wrapper')}>
                <div onClick={() => handleCheckIn('check')}>
                    <CheckCircle className={cx('icon-check')} />
                    <span className={cx('text')}>Có mặt</span>
                </div>
                <div onClick={() => handleCheckIn('uncheck')}>
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
            <div style={{ height: 'calc(100vh - 220px)', width: '100%' }}>
                <DataGrid
                    rows={members}
                    getRowId={(row) => row.username}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    isRowSelectable={(params) => params.row.status !== 'canceled' && params.row.check_in}
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
