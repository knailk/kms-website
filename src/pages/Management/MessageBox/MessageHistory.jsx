import { Avatar as AvatarChatUi } from '@chatscope/chat-ui-kit-react';
import { Message, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import { memo } from 'react';

function MessageHistory({ chatHistory, showSeperator }) {
    const formatDate = (dateStr) => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            {chatHistory &&
                chatHistory.map((chat, idx) => {
                    let Component = [];
                    if (showSeperator === 'show') {
                        Component.push(<MessageSeparator key={idx} content={formatDate(chat.date)} />);
                    }
                    chat.messages.forEach((message, idx) => {
                        if (message.direction === 'incoming') {
                            Component.push(
                                <Message
                                    model={{
                                        direction: message.direction,
                                        message: message.content,
                                        position: message.position,
                                        sender: message.sender.name,
                                        sentTime: '15 mins ago',
                                    }}
                                    key={message.id + idx}
                                    style={{ maxWidth: '85%' }}
                                    avatarSpacer={!message.showAvatar}
                                >
                                    {message.showAvatar === true && (
                                        <AvatarChatUi name={message.sender.name} src={message.sender.avatar} />
                                    )}
                                </Message>,
                            );
                        } else {
                            Component.push(
                                <Message
                                    model={{
                                        direction: message.direction,
                                        message: message.content,
                                        position: message.position,
                                        sender: message.sender.name,
                                        sentTime: '15 mins ago',
                                    }}
                                    key={message.id + idx}
                                ></Message>,
                            );
                        }
                    });
                    return Component;
                })}
        </>
    );
}

export default memo(MessageHistory);
