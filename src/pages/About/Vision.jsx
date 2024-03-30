import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);

function Vision() {
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
                        <h2>Tầm Nhìn</h2>
                    </div>
                </Grid>
                <Grid item xs={9} className={cx('content-right')}>
                    <p>
                        Chương trình giáo dục tại Smart Kindergarten được phát triển dựa trên sự thấu hiểu rằng trẻ em
                        phát triển trong một tổng hòa phức tạp của các hệ thống có liên quan lẫn nhau, bao gồm gia đình,
                        nhà trường, cộng đồng xung quanh và thế giới. Mặc dù các chương trình mầm non truyền thống thừa
                        nhận tầm quan trọng của các hệ thống này, nhưng lại có khuynh hướng tách bạch từng hệ thống và
                        thực hiện việc tác động riêng rẽ đến trẻ. Khác biệt tại Smart Kindergarten là chương trình được
                        thiết kế dựa trên nhận thức được tầm quan trọng của việc phát triển những mối liên hệ giữa các
                        hệ thống đến trẻ, đồng thời tập trung xây dựng và phát triển các mối liên hệ này. Đặt các liên
                        hệ vào trọng tâm của tầm nhìn giáo dục, chương trình Smart Kindergarten đưa trẻ vào quỹ đạo tích
                        cực hơn cho việc học tập và rèn luyện.
                    </p>

                    <div>
                        <img src="/images/vision.jpg" alt="vision" width={370} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Vision;
