import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { HOME_TEACHERS } from '~/constants/home_teachers';

const cx = classNames.bind(styles);

function TeacherTeam() {
    const CardTeacher = ({ image }) => (
        <Card sx={{ maxWidth: 210, boxShadow: 'none', backgroundColor: 'transparent' }}>
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

    return (
        <div
            className={cx('teacher-team')}
            style={{ backgroundImage: 'url(images/backgroundhome2.webp)', backgroundSize: '100% 100%' }}
        >
            <div className={cx('container')}>
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
                    {HOME_TEACHERS.map((image, index) => (
                        <Grid key={index} item xs={3}>
                            <CardTeacher image={image} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default TeacherTeam;
