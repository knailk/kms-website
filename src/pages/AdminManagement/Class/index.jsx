import * as React from 'react';

import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import 'rsuite/dist/rsuite.min.css';
import { DataGrid } from '@mui/x-data-grid';
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '@mui/material';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import request from '~/utils/http';
import AddMembersForm from './AddMembersForm';
import CreateClassForm from './CreateClassForm';
import SchoolIcon from '@mui/icons-material/School';

const cx = classNames.bind(styles);

const styleBox = {
    position: 'absolute',
    bgcolor: 'white',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '45px',
    borderRadius: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const columns = [
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.email,
    },
    {
        field: 'avatar',
        headerName: 'Photo',
        width: 50,
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
        field: 'fullName',
        headerName: 'Họ và tên',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.fullName,
    },
    {
        field: 'phoneNumber',
        headerName: 'Số điện thoại',
        width: 150,
        valueGetter: (value, row) => row.phoneNumber,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ',
        width: 200,
        editable: true,
        valueGetter: (value, row) => row.address,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
        editable: true,
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
        editable: true,
        valueGetter: (value, row) => row.joinedAt,
    },
    {
        field: 'members',
        headerName: 'Học viên',
        width: 100,
        align: 'center',
        editable: false,
        renderCell: (params) => {
            return (
                <IconButton aria-label="delete" color="secondary">
                    <RemoveRedEyeIcon />
                </IconButton>
            );
        },
    },
];

export default function Class() {
    const context = React.useContext(LoggedContext);
    const [classes, setClasses] = React.useState([]);
    const [members, setMembers] = React.useState([]);
    const [classSelected, setClassSelected] = React.useState({});
    const [openAddMembers, setOpenAddMembers] = React.useState(false);
    const [openCreateClass, setOpenCreateClass] = React.useState(false);
    const [membersCanRemoved, setMembersCanRemoved] = React.useState([]);

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
    }, [openCreateClass]);

    React.useEffect(() => {
        if (Object.keys(classSelected).length === 0) return;
        request
            .get(`/class/${classSelected.id}/members`)
            .then((res) => {
                setMembers(res.data.users);
            })
            .catch((error) => {
                context.setShowSnackbar('Tìm thông tin thành viên không thành công', 'error');
            });
    }, [classSelected, openAddMembers]);

    const handleRemoveMember = () => {
        if (membersCanRemoved.length <= 0) return;
        request
            .delete(`/admin/class/${classSelected.id}/members`, { data: { usernames: membersCanRemoved } })
            .then((res) => {
                context.setShowSnackbar('Xoá thành viên thành công', 'success');
                members.forEach((member) => {
                    if (membersCanRemoved.includes(member.username)) {
                        member.status = 'canceled';
                    }
                });
                setMembersCanRemoved([]);
            })
            .catch((error) => {
                context.setShowSnackbar('Xoá thành viên không thành công', 'error');
            });
    };

    return (
        <>
            <h2 className={cx('title')}>Danh sách lớp học</h2>
            <div className={cx('classes-wrapper')}>
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
                    <Button variant="contained" startIcon={<SchoolIcon />} onClick={() => setOpenCreateClass(true)}>
                        Tạo lớp mới
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        startIcon={<PersonRemoveIcon />}
                        color="error"
                        style={{ marginRight: '5px' }}
                        disabled={membersCanRemoved.length <= 0}
                        onClick={() => handleRemoveMember()}
                    >
                        Xoá thành viên
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => setOpenAddMembers(true)}
                    >
                        Thêm thành viên
                    </Button>
                </div>
            </div>
            <div style={{ height: 'calc(90vh - 196px)', width: '100%' }}>
                <DataGrid
                    rows={members}
                    columns={columns}
                    getRowId={(row) => row.username}
                    checkboxSelection
                    isRowSelectable={(params) => params.row.status !== 'canceled'}
                    onRowSelectionModelChange={(ids) => {
                        setMembersCanRemoved(ids);
                    }}
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
            <Modal
                open={openAddMembers}
                onClose={() => setOpenAddMembers(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <AddMembersForm
                        members={members}
                        setOpenAddMembers={setOpenAddMembers}
                        currentClass={classSelected}
                    />
                </Box>
            </Modal>
            <Modal
                open={openCreateClass}
                onClose={() => setOpenCreateClass(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <CreateClassForm setOpenCreateClass={setOpenCreateClass} />
                </Box>
            </Modal>
        </>
    );
}
