import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);

function Purpose() {
    return (
        <div className={cx('content-wrapper')}>
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
                        <h2>Mục tiêu hoạt động</h2>
                    </div>
                </Grid>
                <Grid item xs={9} className={cx('content-right')}>
                    <p>Hệ thống Trường Mầm non Tinh Tú SchoolKids hoạt động theo những mục tiêu dài hạn như sau:</p>
                    <ul className={cx('list-items')}>
                        <li className={cx('item')}>
                            <span>
                                Chương trình phát triển theo hướng tiếp cận tiên tiến, phát huy tối đa kỹ năng tiếp nhận
                                và sáng tạo của trẻ trong giai đoạn 0-6 tuổi
                            </span>
                        </li>
                        <li className={cx('item')}>
                            <span>
                                Chương trình học lấy học sinh làm trọng tâm. Học sinh tham gia học tập tích cực thông
                                qua các hoạt động có liên quan đến cuộc sống, cộng đồng và môi trường.
                            </span>
                        </li>
                        <li className={cx('item')}>
                            <span>
                                Các phương pháp giáo dục tiên tiến trên thế giới như phương pháp Tiếp cận Dự án,
                                Montessori, Reggio Emilia, Baby Can Read đều được phát triển trên nền tảng Thuyết Trí
                                Thông Minh Đa Dạng (Multiple Intelligences) của Howard Gardner.
                            </span>
                        </li>
                        <li className={cx('item')}>
                            <span>
                                Phát triển Kỹ năng Cảm xúc Xã hội (SEL) là chương trình xuyên suốt và trọng tâm vì hạnh
                                phúc của các bé và sự thành công của chương trình giáo dục đầu đời làm tiền đề cho
                                chương trình giáo dục phổ thông tiếp theo.
                            </span>
                        </li>
                        <li className={cx('item')}>
                            <span>
                                Sự tham gia của gia đình là một yếu tố quan trọng trong việc tạo môi trường giáo dục
                                toàn diện cho sự phát triển của trẻ, thu hẹp khoảng cách giữa gia đình và nhà trường.
                            </span>
                        </li>
                    </ul>
                    <div>
                        <img src="/images/purpose.jpg" alt="purpose" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Purpose;
