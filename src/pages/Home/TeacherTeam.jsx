import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
const cx = classNames.bind(styles);
function TeacherTeam() {
    const CardTeacher = ({ image }) => (
        <Card sx={{ maxWidth: 210 }}>
            <CardMedia sx={{}} image={image.imgPath} className={cx('image')} title="green iguana" />
            <CardContent>
                <Typography variant="h3" color="text.secondary" className={cx('name')}>
                    {image.name}
                </Typography>
                <Typography variant="h3" color="text.secondary" className={cx('class')}>
                    {image.class}
                </Typography>
            </CardContent>
        </Card>
    );

    const images = [
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath:
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            name: 'Lê Thị Ngọc Yến',
            class: 'GV Lớp Owl',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    return (
        <div className={cx('teacher-team')}>
            <div className={cx('title')}>
                <div>Đội ngũ</div>
                <h2>
                    <span>Giáo viên ưu tú</span>
                </h2>
            </div>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                style={{ margin: '25px 0px' }}
                justifyContent="center"
            >
                {images.map((image, index) => (
                    <Grid key={index} item xs={3}>
                        <CardTeacher image={image} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default TeacherTeam;
