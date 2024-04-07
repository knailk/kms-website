import { Box, Card, CardActions, CardContent, Grid, IconButton, Modal, Tooltip } from '@mui/material';
import { GroupAdd, RateReview } from '@mui/icons-material';
import Avatar from '~/components/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import ModalCreateGroup from './ModalCreateGroup';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    width: '350px',
    height: '435px',
    bgcolor: 'white',
    zIndex: 1000,
    p: '10px',
    borderRadius: 1,
    top: '25%',
    left: '50%',
    transform: 'translateX(-50%)',
    '&:focus': {
        outline: 'none',
    },
};
function ChatContainerHeader({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <>
            <Card className={cx('card-wrapper')}>
                <Avatar src={data['avatar']} name={data['name']} style={{ marginTop: '5px' }} />
                <CardContent sx={{ padding: '0px 0px 0px 10px !important', width: '100%' }}>
                    <Grid container style={{ height: '100%', paddingTop: 5 }}>
                        <Grid item xs={12} style={{ fontWeight: 600, fontSize: 16, alignSelf: 'center' }}>
                            {data['name']}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{
                                color: '#888787',
                                fontSize: 14,
                                display: 'flex',
                            }}
                        >
                            <div
                                style={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                12 người tham gia
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={cx('card-actions')}>
                    <span>
                        <Tooltip title="Sửa tên nhóm">
                            <IconButton>
                                <RateReview />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip title="Chỉnh sửa thành viên">
                            <IconButton onClick={() => handleOpenModal()}>
                                <GroupAdd />
                            </IconButton>
                        </Tooltip>
                    </span>
                </CardActions>
            </Card>
            <div>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Box sx={style}>
                            <ModalCreateGroup type="edit" groupId={1} />
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
}
export default ChatContainerHeader;
