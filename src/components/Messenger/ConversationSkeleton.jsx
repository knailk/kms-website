import { Avatar, Card, CardContent, Grid, Skeleton } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
const cx = classNames.bind(styles);

function ConversationSkeleton({ data }) {
    return (
        <Card className={cx('card-wrapper')}>
            <Skeleton variant="circular" width={50} height={50} />

            <CardContent sx={{ padding: '0px 0px 0px 10px !important' }}>
                <Grid container>
                    <Grid item xs={12} style={{ fontWeight: 600, fontSize: 16 }}>
                        <Skeleton variant="text" sx={{ fontSize: 16 }} />
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
                                width: 180,
                            }}
                        >
                            <Skeleton variant="text" sx={{ fontSize: 14 }} />
                        </div>
                        <div></div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ConversationSkeleton;
