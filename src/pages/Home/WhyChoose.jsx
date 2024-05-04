import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid } from '@mui/material';
import { Check } from '@mui/icons-material';
const cx = classNames.bind(styles);

function WhyChoose() {
    return (
        <div className={cx('why-choose')}>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                className={cx('container')}
            >
                <Grid item xs={6}>
                    <div className={cx('title')}>
                        <div>Tại sao chọn</div>
                        <h2>Lý do chọn Smart Kindergarten</h2>
                    </div>
                    <ul className={cx('list-items')}>
                        <li className={cx('item')}>
                            <Check />
                            <span>Ưu tiên hàng đầu sự an toàn của trẻ</span>
                        </li>
                        <li className={cx('item')}>
                            <Check />
                            <span>Cung cấp chương trình học thuật cấp tiến nhất</span>
                        </li>
                        <li className={cx('item')}>
                            <Check />
                            <span>Chăm sóc chu đáo về dinh dưỡng và sức khỏe</span>
                        </li>
                        <li className={cx('item')}>
                            <Check />
                            <span>Đầu tư chuyên môn cho đội ngũ giáo viên ưu tú</span>
                        </li>
                        <li className={cx('item')}>
                            <Check />
                            <span>Tối ưu cơ sở vật chất và đổi mới công cụ giảng dạy</span>
                        </li>
                    </ul>

                    <Button variant="contained" className={cx('button')}>
                        Xem Thêm
                    </Button>
                </Grid>
                <Grid item xs={6} style={{ background: 'url(images/bgwhychoose.webp)', backgroundSize:'100% 100%' }}></Grid>
            </Grid>
        </div>
    );
}

export default WhyChoose;
