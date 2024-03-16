import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardMedia, Grid } from '@mui/material';
const cx = classNames.bind(styles);

function CanLearn() {
    const CardNews = ({ image }) => (
        <Card sx={{ maxWidth: 300 }} className={cx('card')}>
            <CardMedia sx={{}} image={image.imgPath} className={cx('image')} title="" />
            <div className={cx('card-content')}></div>
        </Card>
    );
    const images = [
        {
            imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
            class: 'Lớp 13 tới 18 tháng',
            fromDate: '13/4/2023',
            toDate: '30/10/2023',
        },
        // {
        //     imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
        //     class: 'Lớp 13 tới 18 tháng',
        //     fromDate: '13/4/2023',
        //     toDate: '30/10/2023',
        // },
        // {
        //     imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
        //     class: 'Lớp 13 tới 18 tháng',
        //     fromDate: '13/4/2023',
        //     toDate: '30/10/2023',
        // },
        // {
        //     imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
        //     class: 'Lớp 13 tới 18 tháng',
        //     fromDate: '13/4/2023',
        //     toDate: '30/10/2023',
        // },
        // {
        //     imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
        //     class: 'Lớp 13 tới 18 tháng',
        //     fromDate: '13/4/2023',
        //     toDate: '30/10/2023',
        // },
        // {
        //     imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
        //     class: 'Lớp 13 tới 18 tháng',
        //     fromDate: '13/4/2023',
        //     toDate: '30/10/2023',
        // },
    ];

    return (
        <div className={cx('can-learn')}>
            <div className={cx('title')}>
                {/* <div>Học tập</div> */}
                <h2>{/* <span>Bé học gì ở StarKids</span> */}</h2>
            </div>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                justifyContent="center"
                sx={{my:'25px'}}
            >
                {images.map((image, index) => (
                    <Grid key={index} item xs={4}>
                        <CardNews image={image} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default CanLearn;
