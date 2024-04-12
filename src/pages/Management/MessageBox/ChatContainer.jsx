import InputBase from '@mui/material/InputBase';
import ChatContainerHeader from './ChatContainerHeader';
import MessageHistory from './MessageHistory';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { AddCircle, Mood, ThumbUp, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { memo, useEffect, useRef, useState } from 'react';
import convertDataMessageList from '~/utils/ConverDataMessage';
import EmojiPicker from 'emoji-picker-react';
import request from '~/utils/http';
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

function ChatContainer({ groupId }) {
    const messageContentRef = useRef();
    const chatContainerRef = useRef(null);
    const isNoMoredata = useRef(false);
    const chatHistory = useRef([]);
    const currentUser = 'teacher';
    const textMessage = useRef();
    const doScroll = useRef(true);
    const currentLimit = useRef(20);
    const [groupInfor, setGroupInfor] = useState({});
    const [listMember, setListMember] = useState([]);
    const [chatHistoryShow, setChatHistoryShow] = useState();
    const [showLoading, setShowLoading] = useState(false);
    const doScrollBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 200;
    };

    const handleScrollTop = () => {
        if (chatContainerRef.current.scrollTop <= 10 && !isNoMoredata.current) {
            setShowLoading(true);
            setTimeout(() => {
                currentLimit.current += 20;
                doScroll.current = false;
                getChatHistory('scroll');
                setShowLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        doScroll.current && doScrollBottom();
    }, [chatHistoryShow]);

    //convert data json to orther format json for show data
    useEffect(() => {
        currentLimit.current = 20;
        //get chat history
        request.get(`/chat/${groupId}`).then((response) => {
            setMessageList(response.data.chatMessages);
            setGroupInfor({
                id: response.data.id,
                name: response.data.name,
                avatar: response.data.chatPicture,
            });
            setListMember(response.data.members);
        });
        const intervalId = setInterval(() => {
            getChatHistory();
        }, 1000);

        // Return a cleanup function to clear the interval when the component unmounts or groupId changes
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    const getChatHistory = async (type) => {
        //call api to get chat history
        try {
            await request.get(`/chat/${groupId}?limit=${currentLimit.current}`).then((response) => {
                let data = response.data.chatMessages;
                if (JSON.stringify(data) !== JSON.stringify(chatHistory.current)) {
                    setMessageList(data);
                } else {
                    if (type === 'scroll') {
                        isNoMoredata.current = true;
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMessage = async (e, type = '') => {
        let text = textMessage.current.value;
        if (text.trim() !== '' && (e.keyCode === 13 || type === 'click')) {
            await request
                .post(`/chat/${groupId}/message`, { message: text, type: 'text' })
                .then(() => {
                    getChatHistory();
                    textMessage.current.value = '';
                })
                .catch((error) => {});
        }
    };

    const setMessageList = (data) => {
        chatHistory.current = data;
        setChatHistoryShow(convertDataMessageList(data, currentUser));
    };

    return (
        <>
            <div
                className={cx('chat-container')}
                style={{ padding: '0px 20px', height: '100%' }}
                ref={chatContainerRef}
                onScroll={() => handleScrollTop()}
            >
                <ChatContainerHeader data={groupInfor} listMember={listMember} />
                <div style={{ minHeight: 'calc(100vh - 215px)' }}>
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
                        {chatHistoryShow && <MessageHistory chatHistory={chatHistoryShow} showSeperator="show" />}
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
                            inputRef={textMessage}
                            onKeyDown={(e) => handleSendMessage(e)}
                        />
                        <Send
                            className={cx('icon-send', { 'icon-disabled': textMessage.current?.value.trim() === '' })}
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
