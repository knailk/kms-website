import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Box, Fade, Grid, Modal } from '@mui/material';
import Conversation from '~/components/Messenger/Conversation';
import SearchBox from '~/components/SearchBox/SearchBox';
import ChatContainer from './ChatContainer';
import chatHistory from './data.json';
import convertDataMessageList from '~/utils/ConverDataMessage';
import { GroupAdd } from '@mui/icons-material';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import ModalCreateGroup from './ModalCreateGroup';

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

const messageHistoryToday = [
    {
        date: '',
        messages: [
            {
                id: 'msg_',
                content: 'How are you!',
                sender: {
                    uid: '11',
                    name: 'Trần Thị Thu Hà',
                    avatar: 'https://mui.com/static/images/avatar/2.jpg',
                },
            },
            {
                id: 'msg_',
                content: 'How are you!',
                sender: {
                    uid: '11',
                    name: 'Trần Thị Thu Hà',
                    avatar: 'https://mui.com/static/images/avatar/2.jpg',
                },
            },
            {
                id: 'msg_',
                content: 'I am fine!',
                sender: {
                    uid: '1',
                    name: 'Trần Minh Toàn',
                    avatar: 'https://mui.com/static/images/avatar/2.jpg',
                },
            },
        ],
    },
];
function MessageBox() {
    const userLoginId = '1';
    const messageHistory = convertDataMessageList(chatHistory, userLoginId);
    const messageHistoryTodayShow = convertDataMessageList(messageHistoryToday, userLoginId);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    return (
        <>
            <Grid container className={cx('message-box-wrapper')}>
                <Grid item className={cx('content-left')}>
                    <div style={{ padding: '0px 20px' }}>
                        <div className={cx('content-header-left')}>
                            <h2>Đoạn chat</h2>
                            <span onClick={handleOpen}>
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
                    <div className={cx('chat-container')} style={{ padding: '0px 20px', height: '100%' }}>
                        <ChatContainer
                            chatHistory={messageHistory}
                            messageHistoryToday={messageHistoryToday}
                            messageHistoryTodayShow={messageHistoryTodayShow}
                        />
                    </div>
                </Grid>
            </Grid>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Box sx={style}>
                        <ModalCreateGroup />
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default MessageBox;
