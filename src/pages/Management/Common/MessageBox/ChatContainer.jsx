import InputBase from '@mui/material/InputBase';
import { MessageSeparator } from '@chatscope/chat-ui-kit-react';
import ChatContainerHeader from './ChatContainerHeader';
import MessageHistory from './MessageHistory';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { AddCircle, Mood, ThumbUp, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import convertDataMessageList from '~/utils/ConverDataMessage';
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

function ChatContainer({ chatHistory, messageHistoryToday, messageHistoryTodayShow }) {
    const data = {
        uid: '1',
        name: 'Trần Thị Thu Hà',
        avatar: 'https://mui.com/static/images/avatar/1.jpg',
    };
    const curentUser = '1';

    const myRef = useRef(null);
    const [textMessage, setTextMessage] = useState('');
    const [messageList, setMessageList] = useState(messageHistoryToday);
    const [messageListShow, setMessageListShow] = useState(messageHistoryTodayShow);

    useEffect(() => {
        myRef.current.scrollIntoView();
    }, [messageList]);

    const handleSendMessage = (e, type = '') => {
        if (textMessage.trim() !== '' && (e.keyCode === 13 || type === 'click')) {
            console.log(messageList);
            let newMessage = [
                {
                    date: '',
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
            ];
            setMessageList(newMessage);
            setMessageListShow(convertDataMessageList(newMessage, curentUser));
            setTextMessage('');
        }
    };

    return (
        <>
            <ChatContainerHeader data={data} />
            <div>
                <MessageHistory chatHistory={chatHistory} showSeperator="show" />
                <MessageSeparator content={'Hôm nay'} />
                <MessageHistory chatHistory={messageListShow} />
                <div ref={myRef}></div>
            </div>
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
                    <Send
                        className={cx('icon-send', { 'icon-disabled': textMessage.trim() === '' })}
                        onClick={(e) => handleSendMessage(e, 'click')}
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
