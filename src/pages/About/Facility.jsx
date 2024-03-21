import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);

function Facility() {
    return (
        <div classNames={cx('content-wrapper')}>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('content')}
            >
                <Grid item xs={3} className={cx('content-left')}>
                    <div className={cx('title')}>
                        <div>Về chúng tôi</div>
                        <h2>Cơ sở vật chất</h2>
                    </div>
                </Grid>
                <Grid item xs={9} className={cx('content-right')}>
                    <p>
                        Cơ sở SchoolKids Tân Phú: Tầng trệt Cc Lotus Garden, block B, 36 Trịnh Đình Thảo, Phường Hòa
                        Thạnh, Quận Tân Phú
                    </p>
                    <p>
                        Nằm trong khu căn hộ tiện ích tại khu trung tâm của quận Tân Phú, SchoolKids có đầy đủ môi
                        trường và trang thiết bị học tập của một trường mầm non tiêu chuẩn chất lượng cao. Với diện tích
                        trên 950m2, SchoolKids bố trí các khu vực vui chơi và phòng học rộng rãi, thoáng mát, tất cả các
                        phòng học tại nhà trường đều có nhiều cửa tràn ngập ánh sáng thiên nhiên, nơi con bạn được thỏa
                        sức vui chơi, học tập và trải nghiệm. Đặc biệt, hệ thống camera được hoạt động 24/7 đảm bảo an
                        toàn cho con yêu của bạn.
                    </p>
                    <p>
                        Ngoài ra, một môi trường an ninh, an toàn tuyệt đối, tránh ô nhiễm tiếng ồn cho con bạn khi tham
                        gia học tập trải nghiệm và vui chơi, giúp phụ huynh dễ dàng đưa đón con em đi học là một điều mà
                        SchoolKids luôn chú trọng và đảm bảo.
                    </p>
                    <div>
                        <img src="/images/facility.jpg" alt="facility" width={375} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Facility;
