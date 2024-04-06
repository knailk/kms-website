import { useState } from 'react';
import { Avatar, Box, Button, Grid, Input, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function Profile() {
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState("");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1>Profile</h1>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={4}>
                    <Stack alignItems={'center'}>
                        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                        <Input
                            accept="image/*"
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="avatar-upload">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Avatar
                            </Button>
                        </label>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Stack>
                        <Stack>
                            <Typography>
                                Họ và tên
                            </Typography>
                            <TextField size={'small'} sx={{ maxWidth: '500px' }} />
                        </Stack>
                        <Stack>
                            <Typography>
                                Giới tính
                            </Typography>
                            <Select size={'small'} sx={{ maxWidth: '500px' }} value={gender}
                                    onChange={(event) => setGender(event.target.value)}>
                                <MenuItem value={"Nam"}>
                                    Nam
                                </MenuItem>
                                <MenuItem value={"Nu"}>
                                    Nữ
                                </MenuItem>
                            </Select>
                        </Stack>
                        <Stack>
                            <Typography>
                                Số điện thoại
                            </Typography>
                            <TextField size={'small'} sx={{ maxWidth: '500px' }} />
                        </Stack>
                        <Stack>
                            <Typography>
                                Email
                            </Typography>
                            <TextField size={'small'} sx={{ maxWidth: '500px' }} />
                        </Stack>
                        <Stack>
                            <Typography>
                                Địa chỉ
                            </Typography>
                            <TextField size={'small'} sx={{ maxWidth: '500px' }} />
                        </Stack>
                        <Stack>
                            <Typography>
                                Ngày sinh
                            </Typography>
                            <DatePicker sx={{
                                maxWidth: '500px',
                                '& .MuiOutlinedInput-root': {
                                    maxHeight: '45px!important',
                                },
                            }} />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}
