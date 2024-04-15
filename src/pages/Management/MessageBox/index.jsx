import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Box, Grid, Modal } from '@mui/material';
import Conversation from '~/components/Messenger/Conversation';
import SearchBox from '~/components/SearchBox/SearchBox';
import ChatContainer from './ChatContainer';
import { GroupAdd } from '@mui/icons-material';
import { createContext, useEffect, useState, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import ModalCreateGroup from './ModalCreateGroup';
import ConversationSkeleton from '~/components/Messenger/ConversationSkeleton';
import { getDiffTime } from '~/utils/GetDiffTime';
import request from '~/utils/http';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
const cx = classNames.bind(styles);
export const MessageBoxContext = createContext();

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
    const [listMessage, setListMessage] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [reloadData, setReloadData] = useState(false);
    const context = useContext(LoggedContext);

    useEffect(() => {
        getListGroup();
    }, [reloadData]);
    const getListGroup = async () => {
        //call api to get list group
        try {
            await request.get('/chat').then((response) => {
                let chatSessions = response.data.chatSessions;
                if (chatSessions.length > 0) {
                    let messages = [];
                    chatSessions.forEach((element) => {
                        messages.push({
                            id: element.id,
                            name: element.name,
                            time: element.latestMessage ? getDiffTime(new Date(element.latestMessage.createdAt)) : '',
                            text: element.latestMessage ? element.latestMessage.content : '',
                            avatar: element.chatPicture,
                        });
                    });
                    setListMessage(messages);
                    setSelectedGroup(messages[0].id);
                } else {
                    setListMessage([]);
                }
            });
        } catch (error) {
            console.log(error);
            context.setShowSnackbar('Có lỗi xảy ra, vui lòng thử lại sai', 'error');
        }
    };
    return (
        <MessageBoxContext.Provider value={{ setOpen: setOpen, setReloadData: setReloadData }}>
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
                            {listMessage !== null &&
                                listMessage.map((value, index) => (
                                    <Conversation
                                        key={'conversation' + index}
                                        data={value}
                                        handleSelected={() => setSelectedGroup(value.id)}
                                        active={selectedGroup === value.id}
                                    />
                                ))}
                            {listMessage === null && (
                                <>
                                    <ConversationSkeleton />
                                    <ConversationSkeleton />
                                    <ConversationSkeleton />
                                    <ConversationSkeleton />
                                </>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item className={cx('content-right')} id="message-content">
                    {selectedGroup && <ChatContainer groupId={selectedGroup} />}
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
        </MessageBoxContext.Provider>
    );
}

export default MessageBox;
