import { Box, Card, CardActions, CardContent, Grid, IconButton, Modal, Tooltip } from '@mui/material';
import { GroupAdd, GroupRemove, RateReview } from '@mui/icons-material';
import Avatar from '~/components/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import ModalCreateGroup from './ModalCreateGroup';
import Backdrop from '@mui/material/Backdrop';
import { memo, useState } from 'react';
const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    width: '350px',
    height: '465px',
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
function ChatContainerHeader({ data, listMember }) {
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState('');
    const handleOpenModal = (type) => {
        setOpenModal(true);
        setType(type);
    };
    return (
        <>
            <Card className={cx('card-wrapper')}>
                <Avatar src={data.avatar} name={data.name} style={{ marginTop: '5px' }} />
                <CardContent sx={{ padding: '0px 0px 0px 10px !important', width: '100%' }}>
                    <Grid container style={{ height: '100%', paddingTop: 5 }}>
                        <Grid item xs={12} style={{ fontWeight: 600, fontSize: 16, alignSelf: 'center' }}>
                            {data.name}
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
                                {listMember?.length} người tham gia
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
                        <Tooltip title="Thêm thành viên">
                            <IconButton onClick={() => handleOpenModal('add')}>
                                <GroupAdd />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip title="Xóa thành viên">
                            <IconButton onClick={() => handleOpenModal('delete')}>
                                <GroupRemove sx={{ color: '#d32f2f' }} />
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
                            <ModalCreateGroup
                                type={type}
                                groupId={data.id}
                                listMember={listMember}
                                setOpenModal={setOpenModal}
                            />
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
}
export default memo(ChatContainerHeader);
