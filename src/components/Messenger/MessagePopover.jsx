import { Avatar, Badge, Card, CardContent, Divider, Grid } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
const cx = classNames.bind(styles);

export default function MessagePopover({ data }) {
    return (
        <>
            {data.map((value, index) => (
                <>
                    {index !== 0 && <Divider style={{ margin: '5px 0px' }} />}
                    <Card className={cx('card-wrapper')} key={'card' + index}>
                        {value['avatar'] && (
                            <Avatar sx={{ width: 45, height: 45 }} src={value['avatar']} alt={value['name']} />
                        )}
                        {!value['avatar'] && (
                            <Avatar sx={{ width: 45, height: 45 }} src="/static/images/avatar/1.jpg">
                                {Array.from(value['name'])[0]}
                            </Avatar>
                        )}
                        <CardContent sx={{ padding: '0px 0px 0px 10px !important' }}>
                            <Grid container>
                                <Grid item xs={9} style={{ fontWeight: 600 }}>
                                    {value['name']}
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    sx={{ display: 'flex', justifyContent: 'end', fontSize: 15, color: '#888787' }}
                                >
                                    {value['latest-message-time']}
                                </Grid>
                                <Grid
                                    item
                                    xs={9}
                                    style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        width: 243,
                                        color: '#888787',
                                    }}
                                >
                                    {value['latest-message-text']}
                                </Grid>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Avatar sx={{ width: 22, height: 22, fontSize: 13, bgcolor: '#f44336' }}>
                                        {value['unread-message']}
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </>
            ))}
        </>
    );
}
