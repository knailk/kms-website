import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Divider, Grid } from '@mui/material';
import Conversation from '~/components/Messenger/Conversation';
import SearchBox from '~/components/SearchBox/SearchBox';
import ChatContainer from './ChatContainer';

const cx = classNames.bind(styles);
function MessageBox() {
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
        <Grid container className={cx('message-box-wrapper')}>
            <Grid item className={cx('content-left')}>
                <div style={{ padding: '0px 20px' }}>
                    <div className={cx('search-box-wrapper')}>
                        <SearchBox placeholder={'Tìm kiếm trên hộp thoại'} />
                    </div>
                    <div style={{ paddingTop: 60 }}>
                        {dataMessage.map((value, index) => (
                            <Conversation key={'conversation' + index} data={value} />
                        ))}
                    </div>
                </div>
            </Grid>
            <Grid item className={cx('content-right')}>
                <div className={cx('chat-container')} style={{ padding: '0px 20px', height: '100%' }}>
                    <ChatContainer />
                </div>
            </Grid>
        </Grid>
    );
}

export default MessageBox;
