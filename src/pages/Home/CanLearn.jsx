import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Button, Card, CardContent, CardMedia, Grid, Rating } from '@mui/material';
import { HOME_CLASSES } from '~/constants/home_classes';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CanLearn() {
    const navigate = useNavigate();

    const CardNews = ({ image }) => (
        <Card sx={{ maxWidth: 350 }} className={cx('card')}>
            <div className={cx('image-container')}>
                <CardMedia component="img" image={image.imgPath} className={cx('image')} title="" />
            </div>
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

    const theme = createTheme({
        palette: {
            ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            },
        },
    });

    return (
        <div className={cx('home_classes')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <div>LỚP HỌC</div>
                    <h2>
                        <span>Bé học gì ở Smart Kindergarten</span>
                    </h2>
                </div>
                <Grid
                    container
                    spacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    {HOME_CLASSES.map((image, index) => (
                        <Grid key={index} item xs={4}>
                            <CardNews image={image} />
                        </Grid>
                    ))}
                </Grid>
                <div className={cx('button-info')}>
                    <Button variant="contained" onClick={() => navigate('/course')}>
                        Thông tin về lớp học
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CanLearn;
