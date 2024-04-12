import { Avatar, Card, CardContent, Grid } from '@mui/material';
import { generateColor } from '~/utils/BgColorTextAvatar';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
const cx = classNames.bind(styles);

function Conversation({ data, handleSelected, active }) {
    return (
        <Card className={cx('card-wrapper', { 'active-card': active })} onClick={handleSelected}>
            {data['avatar'] && <Avatar sx={{ width: 50, height: 50 }} src={data['avatar']} alt={data['name']} />}
            {!data['avatar'] && (
                <Avatar
                    sx={{ width: 50, height: 50, backgroundColor: generateColor(data['name'].charAt(0).toUpperCase()) }}
                >
                    {data['name'] ? data['name'].charAt(0).toUpperCase() : ''}
                </Avatar>
            )}
            <CardContent sx={{ padding: '0px 0px 0px 10px !important' }}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            fontWeight: 600,
                            fontSize: 16,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '220px',
                        }}
                    >
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
                                width: 160,
                            }}
                        >
                            {data['text']}
                        </div>
                        <div>&#183;{data['time']}</div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Conversation;
