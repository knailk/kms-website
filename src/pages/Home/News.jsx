import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { NEWS } from '~/constants/news';
const cx = classNames.bind(styles);

function News() {
    const CardNews = ({ image }) => (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 200 }} image={image.imgPath} title="green iguana" />
            <CardContent>
                <Typography variant="h3" color="text.secondary" height={50} className={cx('label')}>
                    {image.label}
                </Typography>
                <Typography
                    variant="span"
                    color="text.secondary"
                    fontSize={13}
                    lineHeight={'1.3em'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <AccessTime sx={{ fontSize: 12 }} />
                    <span style={{ marginLeft: 5 }}>{image.date}</span>
                </Typography>
            </CardContent>
        </Card>
    );

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <>
            <div className={cx('news')}>
                <div className={cx('container')}>
                    <h1>Tin tức</h1>
                    <Carousel
                        responsive={responsive}
                        autoPlay={true}
                        autoPlaySpeed={1000}
                        swipeable={true}
                        draggable={true}
                        infinite={true}
                        transitionDuration={1000}
                        pauseOnHover={true}
                        partialVisible={false}
                        dotListClass="custom-dot-list-style"
                        itemClass={cx('carousel-item')}
                        containerClass={cx('carousel-container')}
                    >
                        {NEWS.map((image, idx) => (
                            <CardNews key={idx} image={image} />
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
}

export default News;
