import { Card, CardActions, CardContent, Grid } from '@mui/material';
import { Avatar as AvatarChatUi } from '@chatscope/chat-ui-kit-react';
import { Call, VideoCall, Info } from '@mui/icons-material';
import { Message, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import Avatar from '~/components/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
const cx = classNames.bind(styles);

const ChatContainerHeader = ({ data }) => {
    return (
        <Card className={cx('card-wrapper')}>
            <Avatar src={data['avatar']} name={data['name']} />
            <CardContent sx={{ padding: '0px 0px 0px 10px !important', width: '100%' }}>
                <Grid container style={{ height: '100%', paddingTop: 5 }}>
                    <Grid item xs={12} style={{ fontWeight: 600, fontSize: 16 }}>
                        {data['name']}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            color: '#888787',
                            fontSize: 14,
                            display: 'flex',
                        }}
                    >
                        <div
                            style={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            Active 10 mins ago
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={cx('card-actions')}>
                <span>
                    <Call />
                </span>
                <span>
                    <VideoCall />
                </span>
                <span>
                    <Info />
                </span>
            </CardActions>
        </Card>
    );
};

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

    const chatHistory = [
        {
            date: '2021-09-01',
            messages: [
                {
                    id: 'msg_1',
                    content: 'Hello!',
                    direction: 'incoming',
                    position: 'first',
                    showAvatar: false,
                },
                {
                    id: 'msg_2',
                    content: 'How are you!How are youHow are youHow are youHow are youHow are youHow are you',
                    position: 'last',
                    direction: 'incoming',
                    showAvatar: true,
                },
                {
                    id: 'msg_3',
                    content: 'Hi!',
                    position: 'single',
                    direction: 'outgoing',
                    showAvatar: false,
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
                    position: 'single',
                    showAvatar: true,
                },
                {
                    id: 'msg_5',
                    content: 'I am fine!',
                    direction: 'outgoing',
                    position: 'single',
                    showAvatar: false,
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
                    position: 'single',
                    showAvatar: true,
                },
                {
                    id: 'msg_7',
                    content: 'I am fine!',
                    direction: 'outgoing',
                    position: 'single',
                    showAvatar: false,
                },
                {
                    id: 'msg_8',
                    content: 'How are you!',
                    direction: 'incoming',
                    position: 'first',
                    showAvatar: false,
                },
                {
                    id: 'msg_9',
                    content: 'How are you!',
                    direction: 'incoming',
                    position: 'normal',
                    showAvatar: false,
                },
                {
                    id: 'msg_10',
                    content: 'How are you!',
                    direction: 'incoming',
                    position: 'normal',
                    showAvatar: false,
                },
                {
                    id: 'msg_11',
                    content: 'How are you!',
                    direction: 'incoming',
                    position: 'normal',
                    showAvatar: false,
                },
                {
                    id: 'msg_12',
                    content: 'How are you!',
                    direction: 'incoming',
                    position: 'last',
                    showAvatar: true,
                },
                {
                    id: 'msg_13',
                    content: 'I am fine!',
                    direction: 'outgoing',
                    position: 'first',
                    showAvatar: false,
                },
                {
                    id: 'msg_14',
                    content: 'I am fine!',
                    direction: 'outgoing',
                    position: 'normal',
                    showAvatar: false,
                },
                {
                    id: 'msg_15',
                    content: 'I am fine!',
                    direction: 'outgoing',
                    position: 'last',
                    showAvatar: false,
                },
            ],
        },
    ];

    const formatDate = (dateStr) => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <ChatContainerHeader data={data} />
            {/* <dir style={{ height: '1000px' }}>content</dir> */}
            {chatHistory.map((chat, idx) => {
                let Component = [];
                Component.push(<MessageSeparator key={idx} content={formatDate(chat.date)} />);
                chat.messages.forEach((message) => {
                    if (message.direction === 'incoming') {
                        Component.push(
                            <Message
                                model={{
                                    direction: message.direction,
                                    message: message.content,
                                    position: message.position,
                                    sender: data.name,
                                    sentTime: '15 mins ago',
                                }}
                                key={message.id}
                                style={{ maxWidth: '85%' }}
                                avatarSpacer={!message.showAvatar}
                            >
                                {message.showAvatar === true && <AvatarChatUi name={data.name} src={data.avatar} />}
                            </Message>,
                        );
                    } else {
                        Component.push(
                            <Message
                                model={{
                                    direction: message.direction,
                                    message: message.content,
                                    position: message.position,
                                    sender: currentUser.name,
                                    sentTime: '15 mins ago',
                                }}
                                key={message.id}
                            >
                                {message.showAvatar === true && (
                                    <AvatarChatUi name={currentUser.name} src={currentUser.avatar} />
                                )}
                            </Message>,
                        );
                    }
                });
                return Component;
            })}
        </>
    );
}

export default ChatContainer;
