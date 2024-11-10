import { useState, useContext, memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import request from '~/utils/http';

function ChangePasswordDialog({ open, onClose }) {
    const context = useContext(LoggedContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            context.setShowSnackbar('Mật khẩu mới không khớp', 'error');
            return;
        }

        context.setShowBackDrop(true);
        request
            .put('/auth/change-password', { oldPassword, newPassword })
            .then(() => {
                context.setShowSnackbar('Đổi mật khẩu thành công', 'success');
                onClose();
            })
            .catch((error) => {
                if (error.response?.data?.error) {
                    context.setShowSnackbar(error.response?.data?.error?.message, 'error');
                } else {
                    context.setShowSnackbar('Đổi mật khẩu thất bại', 'error');
                }
            })
            .finally(() => {
                context.setShowBackDrop(false);
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogContent>
                <TextField
                    label="Mật khẩu cũ"
                    type="password"
                    fullWidth
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    margin="dense"
                />
                <TextField
                    label="Mật khẩu mới"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="dense"
                />
                <TextField
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    fullWidth
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleChangePassword} color="primary" variant="contained">
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default memo(ChangePasswordDialog);
