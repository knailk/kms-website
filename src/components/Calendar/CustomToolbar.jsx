import { GetDaysOfWeek } from '~/utils/TimeUtils';
import moment from 'moment';
import Button from '@mui/material/Button';
import 'moment/locale/vi';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

const views = [
    {
        value: 'month',
        label: 'Tháng',
    },
    {
        value: 'week',
        label: 'Tuần',
    },
    {
        value: 'day',
        label: 'Ngày',
    },
    {
        value: 'agenda',
        label: 'Sự kiện',
    },
];

const CustomToolbar = ({ toolbar, viewMode, setViewMode }) => {
    const [checkNumber, setCheckNumber] = React.useState(0);

    const goToBack = () => {
        toolbar.onNavigate('PREV');
        setCheckNumber(checkNumber - 1);
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
        setCheckNumber(checkNumber + 1);
    };

    const goToToday = () => {
        toolbar.onNavigate('TODAY');
        setCheckNumber(1);
    };

    const handleChangeViewMode = (event) => {
        setViewMode(event.target.value);
        toolbar.onView(event.target.value);
    };

    const getCurrentDayInfo = () => {
        if (viewMode === 'week') {
            return `Tuần ${moment(toolbar.date).format('WW')} (${moment(toolbar.date).startOf('isoWeek').format('DD/MM')} - ${moment(toolbar.date).endOf('isoWeek').format('DD/MM')})`;
        } else if (viewMode === 'month') {
            return `Tháng ${moment(toolbar.date).format('MM')} (${moment(toolbar.date).startOf('month').format('DD/MM')} - ${moment(toolbar.date).endOf('month').format('DD/MM')})`;
        } else if (viewMode === 'day') {
            return `Ngày ${moment(toolbar.date).format('DD/MM')}`;
        } else if (viewMode === 'agenda') {
            return moment(toolbar.date).format('DD/MM');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px 10px 20px',
            }}
        >
            <IconButton onClick={goToBack} color="secondary">
                <ArrowBackIosIcon fontSize="large" />
            </IconButton>
            <Button
                style={{
                    borderRadius: '8px',
                    width: 'max-content',
                    fontWeight: 600,
                }}
                variant="outlined"
                onClick={goToToday}
            >
                Hôm nay
            </Button>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 40,
                }}
            >
                <Typography variant="h6">{getCurrentDayInfo()}</Typography>
                <Typography variant="h6">Năm {moment(toolbar.date).format('YYYY')}</Typography>
            </div>
            <TextField
                select
                label="Chọn kiểu xem"
                value={viewMode}
                style={{ minWidth: '150px' }}
                onChange={handleChangeViewMode}
            >
                {views.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <IconButton onClick={goToNext} color="secondary">
                <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
        </div>
    );
};

export default CustomToolbar;
