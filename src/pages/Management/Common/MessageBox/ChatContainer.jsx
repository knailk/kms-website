import { Avatar as AvatarChatUi } from '@chatscope/chat-ui-kit-react';
import InputBase from '@mui/material/InputBase';
import { MessageSeparator } from '@chatscope/chat-ui-kit-react';
import ChatContainerHeader from './ChatContainerHeader';
import MessageHistory from './MessageHistory';
import chatHistory from './data.json';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { AddCircle, Mood, ThumbUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
const cx = classNames.bind(styles);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    fontSize: 15,
}));

function ChatContainer() {
    const data = {
        uid: '1',
        name: 'Trần Thị Thu Hà',
        avatar: 'https://mui.com/static/images/avatar/1.jpg',
    };
    const currentUser = {
        uid: '2',
        name: 'Nguyễn Văn A',
        avatar: 'https://mui.com/static/images/avatar/2.jpg',
    };

    const messageHistoryToday = [
        {
            id: 'msg_',
            content: 'How are you!',
            sender: {
                uid: '1',
                name: 'Trần Thị Thu Hà',
                avatar: 'https://mui.com/static/images/avatar/1.jpg',
            },
            direction: 'incoming',
            position: 'single',
            showAvatar: true,
        },
        {
            id: 'msg_',
            content: 'I am fine!',
            sender: {
                uid: '1',
                name: 'Trần Minh Toàn',
                avatar: 'https://mui.com/static/images/avatar/2.jpg',
            },
            direction: 'outgoing',
            position: 'single',
            showAvatar: false,
        },
    ];
    const [textMessage, setTextMessage] = useState('');
    const [messageList, setMessageList] = useState([{ messages: messageHistoryToday }]);

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            setMessageList([
                {
                    messages: [
                        ...messageList[0].messages,
                        {
                            id: 'msg_',
                            content: textMessage,
                            sender: {
                                uid: '1',
                                name: 'Trần Minh Toàn',
                                avatar: 'https://mui.com/static/images/avatar/2.jpg',
                            },
                            direction: 'outgoing',
                            position: 'single',
                            showAvatar: false,
                        },
                    ],
                },
            ]);
            setTextMessage('');
        }
    };

    return (
        <>
            <ChatContainerHeader data={data} />
            <MessageHistory chatHistory={chatHistory} showSeperator="show" />
            <MessageSeparator content={'Hôm nay'} />
            <MessageHistory chatHistory={messageList} />
            <div className={cx('chat-container-footer')}>
                <div className={cx('icon')}>
                    <AddCircle />
                </div>
                <div className={cx('input-text-wrapper')}>
                    <Mood className={cx('icon-mood')} />
                    <StyledInputBase
                        placeholder={'Nhập tin nhắn...'}
                        inputProps={{ 'aria-label': 'text' }}
                        value={textMessage}
                        onChange={(e) => {
                            setTextMessage(e.target.value);
                        }}
                        onKeyDown={(e) => handleSendMessage(e)}
                    />
                </div>
                <div className={cx('icon')}>
                    <ThumbUp />
                </div>
            </div>
        </>
    );
}

export default ChatContainer;
