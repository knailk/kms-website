import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
const cx = classNames.bind(styles);

export default function CourseBanner() {
    const styleBg = {
        background: 'url(images/bg-banner.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <div
            className={cx('banner-wrapper')}
            style={{
                backgroundImage: "url('images/backgroundhome.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('banner-content')}
            >
                <Grid item xs={5} className={cx('bread-crums')}>
                    Trang chủ {'>>'} Lớp học
                </Grid>
                <Grid item xs={7}></Grid>
                <Grid item xs={5} className={cx('banner')}>
                    <Typography style={{ fontSize: '26px', fontWeight: 700, lineHeight: '1.2em' }}>
                        "Cô không chỉ dạy con những kiến thức, những bài học bổ ích trên lớp mà còn dạy con tình yêu
                        thiên nhiên, tình bạn, biết quan tâm và chia sẻ"
                    </Typography>
                    <Button variant="contained" className={cx('button')}>
                        Xem Thêm
                    </Button>
                </Grid>
                <Grid item xs={7} style={styleBg}></Grid>
            </Grid>
        </div>
    );
}
