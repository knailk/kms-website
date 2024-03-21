import {
    ChatContainer,
    Avatar,
    ConversationHeader,
    MessageList,
    MessageSeparator,
    Message,
    MessageInput,
    InfoButton,
    VoiceCallButton,
    VideoCallButton,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { memo, useContext, useEffect, useState } from 'react';
import { SocketContext } from '.';
import { useSearchParams } from 'react-router-dom';

const chatHistory = [
    {
        date: '2021-09-01',
        messages: [
            {
                id: 'msg_1',
                content: 'Hello!',
                direction: 'incoming',
            },
            {
                id: 'msg_2',
                content: 'How are you!How are youHow are youHow are youHow are youHow are youHow are you',
                direction: 'incoming',
            },
            {
                id: 'msg_3',
                content: 'Hi!',
                direction: 'outgoing',
            },
        ],
    },
    {
        date: '2021-09-02',
        messages: [
            {
                id: 'msg_4',
                content: 'How are you!',
                direction: 'incoming',
            },
            {
                id: 'msg_5',
                content: 'I am fine!',
                direction: 'outgoing',
            },
        ],
    },
    {
        date: '2021-09-03',
        messages: [
            {
                id: 'msg_6',
                content: 'How are you!',
                direction: 'incoming',
            },
            {
                id: 'msg_7',
                content: 'I am fine!',
                direction: 'outgoing',
            },
        ],
    },
];

function MessageBox({ ...props }) {
    const { userData, setTargetUser } = props;
    //set state
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('user_id');
    const socket = useContext(SocketContext);
    const [text, setText] = useState('');
    const [conversation, setConversation] = useState([]);

    //handle event
    const handleClickSend = () => {
        socket.emit('message', { room: userData.user_id, message: text, sender: userId });
        setConversation((prev) => {
            let id_msg = (Math.random() + 1).toString(36).substring(7);
            return [...prev, { id: id_msg, content: text, direction: 'outgoing' }];
        });
        setText('');
    };

    //socket management
    useEffect(() => {
        socket.emit('join_room', userData.user_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data.message);
        });
    }, [socket]);

    //function helper
    const formatData = (dateStr) => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back onClick={() => setTargetUser(null)} />
                    <Avatar name={userData.name} src={userData.avatar} />
                    <ConversationHeader.Content info="Active 10 mins ago" userName={userData.name} />
                    <ConversationHeader.Actions>
                        <VoiceCallButton />
                        <VideoCallButton />
                        <InfoButton />
                    </ConversationHeader.Actions>
                </ConversationHeader>
                <MessageList>
                    {/* <MessageList typingIndicator={<TypingIndicator content={`${userData.name} is typing`} />}> */}
                    {chatHistory.map((chat, idx) => {
                        let Component = [];
                        Component.push(<MessageSeparator key={idx} content={formatData(chat.date)} />);
                        chat.messages.forEach((message) => {
                            Component.push(
                                <Message
                                    model={{
                                        direction: message.direction,
                                        message: message.content,
                                        position: 'single',
                                        sender: userData.name,
                                        sentTime: '15 mins ago',
                                    }}
                                    key={message.id}
                                >
                                    {message.direction === 'incoming' && (
                                        <Avatar name={userData.name} src={userData.avatar} />
                                    )}
                                </Message>,
                            );
                        });
                        return Component;
                    })}
                    {conversation &&
                        conversation.map((message) => (
                            <Message
                                model={{
                                    direction: message.direction,
                                    message: message.content,
                                    position: 'single',
                                    sender: userData.name,
                                    sentTime: '15 mins ago',
                                }}
                                key={message.id}
                            >
                                {message.direction === 'incoming' && (
                                    <Avatar name={userData.name} src={userData.avatar} />
                                )}
                            </Message>
                        ))}
                </MessageList>
                <MessageInput
                    placeholder="Type message here"
                    value={text}
                    onChange={(value) => setText(value)}
                    onSend={handleClickSend}
                />
            </ChatContainer>
        </>
    );
}

export default memo(MessageBox);
