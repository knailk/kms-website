import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { memo, useContext, useEffect, useState } from 'react';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import PlacesAutoComplete from '~/components/GoogleMap/PlacesAutoComplete';
import { ProfileContext } from '.';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const maxWidth = '700px';
function GoogleMapDialog({ address, setAddress, open, handleClose }) {
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth={maxWidth}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <PlacesAutoComplete setPosition={setAddress} position={address} />
            </DialogTitle>
            <DialogContent dividers sx={{ width: '700px', height: '700px' }}>
                <GoogleMap position={address} setPosition={setAddress} />
            </DialogContent>
        </BootstrapDialog>
    );
}

export default memo(GoogleMapDialog);
