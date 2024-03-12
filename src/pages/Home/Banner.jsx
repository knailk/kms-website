import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid } from '@mui/material';
const cx = classNames.bind(styles);

function Banner() {
    return (
        <>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                style={{ margin: '25px 0px' }}
            >
                <Grid item xs={7} className={cx('banner')}>
                    <div className={cx('title')}>
                        <p>CHỌN LỰA ĐẦU TƯ TỐT NHẤT CHO TƯƠNG LAI CON BẠN</p>
                    </div>
                    <div className={cx('description')}>
                        <p>
                            "Chương trình giáo dục lấy trẻ làm trung tâm, phát huy tối đa kỹ năng sống và sức sáng tạo
                            để học tập tích cực"
                        </p>
                    </div>
                    <div className={cx('content')}>
                        Hệ thống Trường Mầm non Tinh Tú StarKids là một hệ thống giáo dục hiện đại không ngừng nâng cao
                        chất lượng – mang lại cho học sinh môi trường học tập và nền tảng học vấn vững chắc, bằng sự kết
                        hợp hài hòa các phương pháp giáo dục tiên tiến nhất với hình thức học qua chơi, học qua khám phá
                        trải nghiệm thực tế. Chúng tôi khuyến khích sự phát triển tự nhiên của trẻ, giúp các con yêu
                        thích việc học tập và rèn luyện các kỹ năng đầu đời chuẩn bị cho thành công ở những bậc học cao
                        hơn.
                    </div>
                    <Button variant="contained" className={cx('button')}>
                        Xem Thêm
                    </Button>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </>
    );
}

export default Banner;
