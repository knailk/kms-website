import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);

function AboutTab() {
    return (
        <Grid
            container
            spacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowSpacing={2}
            style={{ margin: '25px 0px' }}
            className={cx('about-tab')}
        >
            <Grid item xs={3} className={cx('content-left')}>
                <div className={cx('title')}>
                    <div>Về chúng tôi</div>
                    <h2>Về StarKids</h2>
                </div>
            </Grid>
            <Grid item xs={9} className={cx('content-right')}>
                <p>
                    StarKids là hệ thống giáo dục, cung cấp chương trình học thuật và chất lượng đào tạo chuẩn quốc gia
                    cùng với môi trường học được tạo điều kiện tiếp cận với các phương pháp giáo dục ở nước ngoài. Với
                    mong muốn trẻ em Việt Nam được tiếp xúc với nền tinh hoa giáo dục quốc tế để phát triển đóng góp cho
                    đất nước, góp phần tạo ra những công dân toàn cầu của Việt Nam, năng động, sáng tạo, tự chủ, tự tin.
                    Bên cạnh mô hình trường mầm non theo phương pháp Đa trí thông minh (Multiple Intelligences School),
                    StarKids còn là một hệ thống trường tiếp cận với nhiều phương pháp đa dạng như: Giáo dục cảm xúc
                    (SEL-Social &amp; Emotional Learning), Montessori, Reggio, Học theo dự án (Project-based Learning),
                    Học qua các trò chơi (Play-based learning). Với sứ mệnh đào tạo những thế hệ những người Việt trẻ tự
                    tin có đủ trí thức, tài năng và nhân cách, sẵn sàng hội nhập quốc tế, chương trình học của StarKids
                    được được nghiên cứu và phát triển dựa Việc học tập và hoạt động của trẻ kết hợp với nhiều phương
                    pháp tại trường giúp trẻ phát triển toàn diện khả năng về ngôn ngữ, toán học và trang bị kỹ năng, tư
                    duy kiến tạo, tiếp thu các môn học Hệ thống chương trình giáo dục tại StarKids tập trung giúp học
                    sinh hiểu được sức mạnh cá nhân, được sống và được phát triển bản thân từ chính điểm xuất phát là
                    những gì học sinh đã và đang có; rèn luyện từng lời nói, hành động nhỏ; được học và khơi gợi các
                    kiến thức bằng sự đam mê, bằng sự khao khát khám phá, sáng tạo để thực sự học trở nên nhẹ nhàng, học
                    mà như chơi nhưng hiệu quả sẽ vô cùng khác biệt.
                </p>
                <div>
                    <img src="/images/aboutus.jpg" alt="aboutus" />
                </div>
            </Grid>
        </Grid>
    );
}

export default AboutTab;
