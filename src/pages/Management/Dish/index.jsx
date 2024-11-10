import * as React from 'react';
import classNames from 'classnames/bind';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import request from '~/utils/http';
import styles from './Dish.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

export default function DishManagement() {
    const context = React.useContext(LoggedContext);
    const [filters, setFilters] = React.useState({
        fromDate: moment().startOf('isoWeek').format('YYYYMMDD'),
        toDate: moment().endOf('isoWeek').format('YYYYMMDD'),
    });
    const [dishes, setDishes] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [editDish, setEditDish] = React.useState(null);

    const columns = [
        { field: 'dayOfWeek', headerName: 'Thứ', width: 150, editable: false },
        {
            field: 'date',
            headerName: 'Ngày',
            width: 150,
            editable: false,
            renderCell: (params) => moment(params.row.date, 'YYYYMMDD').format('DD/MM'),
        },
        { field: 'breakfast', headerName: 'Bữa sáng', width: 150, editable: true },
        { field: 'eatLightly', headerName: 'Ăn nhẹ', width: 150, editable: true },
        { field: 'lunch', headerName: 'Bữa trưa', width: 150, editable: true },
        { field: 'afternoonSnack', headerName: 'Bữa xế chiều', width: 150, editable: true },
        { field: 'dinner', headerName: 'Bữa tối', width: 150, editable: true },
        {
            field: 'actions',
            headerName: 'Hành động',
            width: 100,
            align: 'center',
            editable: false,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const fetchDishes = () => {
        request
            .get('dishes/week', { params: filters })
            .then((res) => setDishes(res?.data?.dishes))
            .catch(() => context.setShowSnackbar('Tìm thông tin thực dơn không thành công', 'error'));
    };

    const handleEdit = (dish) => {
        setEditDish(dish);
        setOpen(true);
    };

    const handleDelete = (id) => {
        request
            .delete(`admin/dishes/${id}`)
            .then(() => {
                context.setShowSnackbar('Dish deleted successfully', 'success');
                fetchDishes();
            })
            .catch(() => context.setShowSnackbar('Failed to delete dish', 'error'));
    };

    const handleSave = () => {
        const apiCall = editDish.id
            ? request.put(`admin/dishes/${editDish.id}`, editDish)
            : request.post('admin/dishes', editDish);

        apiCall
            .then(() => {
                context.setShowSnackbar('Dish saved successfully', 'success');
                setOpen(false);
                fetchDishes();
            })
            .catch(() => context.setShowSnackbar('Failed to save dish', 'error'));
    };

    React.useEffect(() => {
        fetchDishes();
    }, [filters]);

    const formatForInput = (date) => moment(date, 'YYYYMMDD').format('YYYY-MM-DD');

    const getWeekday = (date) => {
        const weekdayMap = {
            Monday: 'Thứ 2',
            Tuesday: 'Thứ 3',
            Wednesday: 'Thứ 4',
            Thursday: 'Thứ 5',
            Friday: 'Thứ 6',
            Saturday: 'Thứ 7',
            Sunday: 'Chủ nhật',
        };
        const weekday = moment(date).locale('en').format('dddd');
        return weekdayMap[weekday] || weekday;
    };

    return (
        <>
            <h2 className={cx('title')}>Manage Dishes</h2>
            <div className={cx('filter-wrapper')}>
                <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                    <TextField
                        id="from-date-filter"
                        label="Chọn từ ngày"
                        type="date"
                        value={formatForInput(filters.fromDate)}
                        onChange={(event) => {
                            const formattedDate = moment(event.target.value).format('YYYYMMDD');
                            setFilters({ ...filters, fromDate: formattedDate });
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                    <TextField
                        id="to-date-filter"
                        label="Chọn đến ngày"
                        type="date"
                        value={formatForInput(filters.toDate)}
                        onChange={(event) => {
                            const formattedDate = moment(event.target.value).format('YYYYMMDD');
                            setFilters({ ...filters, toDate: formattedDate });
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </FormControl>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={() => {
                        setEditDish({
                            dayOfWeek: '',
                            date: '',
                            breakfast: '',
                            eatLightly: '',
                            lunch: '',
                            afternoonSnack: '',
                            dinner: '',
                        });
                        setOpen(true);
                    }}
                >
                    Tạo thực đơn mới
                </Button>
            </div>
            <div style={{ height: 'calc(90vh - 196px)', width: '100%' }}>
                <DataGrid
                    rows={dishes}
                    columns={columns}
                    getRowId={(row) => row.id}
                    slots={{ toolbar: GridToolbar }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'dayOfWeek', sort: 'asc' }],
                        },
                        pagination: { paginationModel: { page: 0, pageSize: 20 } },
                        density: 'compact',
                    }}
                />
            </div>

            {/* Dialog for editing/adding a dish */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{editDish?.id ? 'Cập nhật thực đơn' : 'Tạo thực đơn mới'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Chọn ngày"
                        type="date"
                        value={formatForInput(editDish?.date)}
                        onChange={(event) => {
                            const weekday = getWeekday(moment(event.target.value));
                            const formattedDate = moment(event.target.value).format('YYYYMMDD');
                            setEditDish({ ...editDish, date: +formattedDate, dayOfWeek: weekday });
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Bữa sáng"
                        fullWidth
                        value={editDish?.breakfast || ''}
                        onChange={(e) => setEditDish({ ...editDish, breakfast: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Ăn nhẹ"
                        fullWidth
                        value={editDish?.eatLightly || ''}
                        onChange={(e) => setEditDish({ ...editDish, eatLightly: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Bữa trưa"
                        fullWidth
                        value={editDish?.lunch || ''}
                        onChange={(e) => setEditDish({ ...editDish, lunch: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Bữa xế chiều"
                        fullWidth
                        value={editDish?.afternoonSnack || ''}
                        onChange={(e) => setEditDish({ ...editDish, afternoonSnack: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Bữa chiều"
                        fullWidth
                        value={editDish?.dinner || ''}
                        onChange={(e) => setEditDish({ ...editDish, dinner: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
