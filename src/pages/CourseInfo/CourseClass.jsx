import classNames from 'classnames/bind';
import styles from '../Home/Home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Grid, Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
const cx = classNames.bind(styles);

function CourseClass({classes}) {
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
                        <span>{image.className}</span>
                    </h3>
                </div>
                <div className={cx('content-time')}>
                    Từ ngày {image.fromDate} đến ngày {image.toDate}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className={cx('can-learn')}>
            <div className={cx('container')}>
                <Grid container sx={{mb:"40px", mt: "20px" , borderBottom:'1px solid rgb(93 93 93 / 50%)'}}>
                    <Grid item xs={2} sx={{pl:"10px"}}>
                        <Typography>Smart KinderGarten</Typography>
                        <Typography
                            style={{
                                fontSize: '26px',
                                fontWeight: '700',
                                fontFamily: '"Nunito", sans-serif',
                                maxWidth: '600px',
                                color: '#545454',
                            }}
                        >
                            Lớp Học
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sx={{pl:'25px', borderLeft:'1px solid rgb(93 93 93 / 50%)', pr:'20px'}}>
                        <Typography sx={{ mr: "20px", fontSize: '15px', fontWeight: '400' }}>
                            Các lớp học tại Smart KinderGarten được phân bổ theo từng độ tuổi, từ 1 tuổi đến 6 tuổi. Phòng
                            học được trang bị cơ sở vật chất, thiết bị đầy đủ, đa dạng phù hợp với độ tuổi của từng lớp,
                            nhằm đáp ứng nhu cầu trải nghiệm của trẻ cũng như mục tiêu giáo dục mà Smart KinderGarten đưa ra.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    {classes.map((image, index) => (
                        <Grid key={index} item xs={4}>
                            <CardNews image={image} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default CourseClass;
