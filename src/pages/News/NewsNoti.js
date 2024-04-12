import classNames from 'classnames/bind';
import styles from '../Home/Home.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
const cx = classNames.bind(styles);

export default function NewsNoti() {
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
    const images = [
        {
            label: 'Thông Báo. Thu Học Phí Tháng 01 Và Tháng 02 Năm 2024',
            date: '28 Tháng Mười Hai, 2023',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Chuyến Đi Vui Nhộn của Các Bạn Nhỏ Trường Mầm Non SchoolKids',
            date: '28 Tháng Mười Hai, 2023',
            imgPath:
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Lớp học ngoại khóa WOW ART',
            date: '28 Tháng Mười Hai, 2023',
            imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
            label: 'Goč, Serbia',
            date: '28 Tháng Mười Hai, 2023',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Goč, Serbia',
            date: '28 Tháng Mười Hai, 2023',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];
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
                    <h1>Thông báo</h1>
                    <Carousel
                        responsive={responsive}
                        autoPlay={false}
                        swipeable={true}
                        draggable={true}
                        partialVisible={false}
                        dotListClass="custom-dot-list-style"
                        itemClass={cx('carousel-item')}
                        containerClass={cx('carousel-container')}
                    >
                        {images.map((image, idx) => (
                            <CardNews key={idx} image={image} />
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
}

