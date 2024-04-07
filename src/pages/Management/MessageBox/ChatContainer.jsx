import InputBase from '@mui/material/InputBase';
import { MessageSeparator } from '@chatscope/chat-ui-kit-react';
import ChatContainerHeader from './ChatContainerHeader';
import MessageHistory from './MessageHistory';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { AddCircle, Mood, ThumbUp, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { memo, useEffect, useRef, useState } from 'react';
import convertDataMessageList from '~/utils/ConverDataMessage';
import EmojiPicker from 'emoji-picker-react';
import { Box, CircularProgress } from '@mui/material';
const cx = classNames.bind(styles);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    fontSize: 15,
}));

function ChatContainer({ ...props }) {
    const data = {
        uid: '1',
        name: 'Trần Thị Thu Hà',
        avatar: 'https://mui.com/static/images/avatar/1.jpg',
    };
    const curentUser = '1';
    const messageContentRef = useRef();
    const chatContainerRef = useRef(null);
    const [testState, setTestState] = useState('test');
    console.log('render');
    const [textMessage, setTextMessage] = useState('');
    const [chatHistory, setChatHistory] = useState(props.chatHistory);
    const [chatHistoryShow, setChatHistoryShow] = useState(convertDataMessageList(props.chatHistory, curentUser));

    const [showLoading, setShowLoading] = useState(false);

    const doScrollBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    const handleScrollTop = () => {
        if (chatContainerRef.current.scrollTop <= 10) {
            setShowLoading(true);
            setTimeout(() => {
                setShowLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        doScrollBottom();
    }, [chatHistoryShow]);

    //convert data json to orther format json for show data
    useEffect(() => {
        setChatHistoryShow(convertDataMessageList(chatHistory, curentUser));
    }, [chatHistory]);

    const handleSendMessage = (e, type = '') => {
        if (textMessage.trim() !== '' && (e.keyCode === 13 || type === 'click')) {
            let newMessage = {
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
            };
            let today = new Date().toISOString().split('T')[0];
            let newChatHistory = [...chatHistory];
            let idxTodayData = newChatHistory.findIndex((d) => d.date === today);
            if (idxTodayData > -1) {
                newChatHistory[idxTodayData].messages.push(newMessage);
                setChatHistory(newChatHistory);
                setTextMessage('');
            } else {
                setChatHistory([...chatHistory, { date: today, messages: [newMessage] }]);
                setTextMessage('');
            }
        }
    };

    return (
        <>
            <div
                className={cx('chat-container')}
                style={{ padding: '0px 20px', height: '100%' }}
                ref={chatContainerRef}
                onScroll={() => handleScrollTop()}
            >
                <ChatContainerHeader data={data} />
                <div>
                    {showLoading && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                                margin: '10px 0px',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    <div ref={messageContentRef}>
                        <MessageHistory chatHistory={chatHistoryShow} showSeperator="show" />
                    </div>
                </div>
                <div className={cx('chat-container-footer')}>
                    <div className={cx('icon')}>
                        <AddCircle />
                    </div>
                    <div className={cx('input-text-wrapper')}>
                        <div>
                            {/* <EmojiPicker /> */}
                            <Mood className={cx('icon-mood')} />
                        </div>
                        <StyledInputBase
                            placeholder={'Nhập tin nhắn...'}
                            inputProps={{ 'aria-label': 'text' }}
                            value={textMessage}
                            onChange={(e) => {
                                setTextMessage(e.target.value);
                            }}
                            onKeyDown={(e) => handleSendMessage(e)}
                        />
                        <Send
                            className={cx('icon-send', { 'icon-disabled': textMessage.trim() === '' })}
                            onClick={(e) => handleSendMessage(e, 'click')}
                        />
                    </div>
                    <div className={cx('icon')}>
                        <ThumbUp />
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(ChatContainer);
