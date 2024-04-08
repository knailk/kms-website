import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Box, Grid, Modal } from '@mui/material';
import Conversation from '~/components/Messenger/Conversation';
import SearchBox from '~/components/SearchBox/SearchBox';
import ChatContainer from './ChatContainer';
import chatHistory from './data.json';
import { GroupAdd } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import ModalCreateGroup from './ModalCreateGroup';
import request from '~/utils/http';

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

function MessageBox() {
    const [open, setOpen] = useState(false);

    const dataMessage = [
        {
            name: 'Trần Thị Thu Hà',
            time: '10 giờ',
            text: 'Tin nhắn và cuộc gọi được bảo mật ',
            avatar: 'https://mui.com/static/images/avatar/1.jpg',
        },
        {
            name: 'Nguyễn Thị Thanh Hà',
            time: '10 giờ',
            text: 'Xin chào toàn thể cán bộ giáo viên và học sinh',
            avatar: 'https://mui.com/static/images/avatar/2.jpg',
        },
        {
            name: 'Lê Thị Thanh Hà',
            time: '10 giờ',
            text: 'Chào cô',
            avatar: 'https://mui.com/static/images/avatar/3.jpg',
        },
        {
            name: 'Lê Thị Thanh Hà',
            time: '10 giờ',
            text: 'Chào cô',
            avatar: 'https://mui.com/static/images/avatar/4.jpg',
        },
        {
            name: 'Lê Thị Thanh Hà',
            time: '10 giờ',
            text: 'Chào cô',
            avatar: 'https://mui.com/static/images/avatar/5.jpg',
        },
        {
            name: 'Lê Thị Thanh Hà',
            time: '10 giờ',
            text: 'Chào cô',
            avatar: 'https://mui.com/static/images/avatar/6.jpg',
        },
        {
            name: 'Lê Thị Thanh Hà',
            time: '10 giờ',
            text: 'Chào cô',
            avatar: 'https://mui.com/static/images/avatar/7.jpg',
        },
    ];

    useEffect(() => {
        getListGroup();
    }, []);

    const getListGroup = async () => {
        //call api to get list group
        await request.get('/chat').then((response) => {
            console.log(response.data);
        });
    };
    return (
        <>
            <Grid container className={cx('message-box-wrapper')}>
                <Grid item className={cx('content-left')}>
                    <div style={{ padding: '0px 20px' }}>
                        <div className={cx('content-header-left')}>
                            <h2>Đoạn chat</h2>
                            <span onClick={() => setOpen(true)}>
                                <GroupAdd />
                            </span>
                        </div>
                        <div className={cx('search-box-wrapper')}>
                            <SearchBox placeholder={'Tìm kiếm trên hộp thoại'} />
                        </div>
                        <div>
                            {dataMessage.map((value, index) => (
                                <Conversation key={'conversation' + index} data={value} />
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item className={cx('content-right')} id="message-content">
                    <ChatContainer chatHistory={chatHistory} />
                </Grid>
            </Grid>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={() => setOpen(false)}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Box sx={style}>
                        <ModalCreateGroup type="create" />
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default MessageBox;
