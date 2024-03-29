import { Card, CardActions, CardContent, Grid } from '@mui/material';
import { Call, VideoCall, Info } from '@mui/icons-material';
import Avatar from '~/components/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
const cx = classNames.bind(styles);

function ChatContainerHeader({ data }) {
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
}
export default ChatContainerHeader;
