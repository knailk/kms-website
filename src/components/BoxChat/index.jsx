import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import styles from './BoxChat.module.scss';
import classNames from 'classnames/bind';
import users from './user.json';
import MessageBox from './MessageBox';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const socket = io.connect('http://localhost:3001');

export const SocketContext = createContext();

function BoxChat() {
    console.log('render-parent');
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('user_id');

    //state management
    const [checked, setChecked] = useState(false);
    const [targetUser, setTargetUser] = useState(null);
    const [messageHistory, setMessageHistory] = useState([{ id_msg: '', content: '', direction: '' }]);

    //event button management
    const handleChange = () => {
        setChecked((prev) => !prev);
    };


    //event socket management
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected');
            socket.emit('join_room', userId);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <SocketContext.Provider value={socket}>
                <div className={cx('message-box-container')}>
                    {!targetUser && (
                        <ConversationList className={cx('conversation-list')}>
                            {users.map((user, index) => (
                                <Conversation
                                    key={index}
                                    name={user.name}
                                    lastSenderName={user.name}
                                    info="Hello how are you?"
                                    onClick={() => setTargetUser(user)}
                                >
                                    <Avatar src={user.avatar} name={user.name} />
                                </Conversation>
                            ))}
                        </ConversationList>
                    )}
                    {targetUser && <MessageBox setTargetUser={setTargetUser} userData={targetUser} socket={socket} />}
                </div>
            </SocketContext.Provider>
        </>
    );
}

export default BoxChat;
