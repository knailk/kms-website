import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Grid, Rating } from '@mui/material';
const cx = classNames.bind(styles);

function CanLearn() {
    const CardNews = ({ image }) => (
        <Card sx={{ maxWidth: 350 }} className={cx('card')}>
            <CardMedia sx={{}} image={image.imgPath} className={cx('image')} title="" />
            <CardContent className={cx('card-content')}>
                <div className={cx('content-info')}>
                    <span className={cx('tag-class')}>Lớp học</span>
                    <div style={{ marginTop: 10 }}>
                        <Rating name="read-only" value={5} readOnly size="small" />
                    </div>
                    <h3 style={{ maxWidth: '55%' }}>
                        <span>{image.class}</span>
                    </h3>
                </div>
                <div className={cx('content-time')}>
                    Từ ngày {image.fromDate} đến ngày {image.toDate}
                </div>
            </CardContent>
        </Card>
    );
    const images = [
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        {
            imgPath: 'images/canlearn.webp',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
    ];

    return (
        <div className={cx('can-learn')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <div>LỚP HỌC</div>
                    <h2>
                        <span>Bé học gì ở SchoolKids</span>
                    </h2>
                </div>
                <Grid
                    container
                    spacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    {images.map((image, index) => (
                        <Grid key={index} item xs={4}>
                            <CardNews image={image} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default CanLearn;
