import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);

function WhyChoose() {
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
                        <h2>Lý do chọn Smart Kindergarten</h2>
                    </div>
                </Grid>
                <Grid item xs={9} className={cx('content-right')}>
                    <Grid container style={{ backgroundColor: '#80d8ff', marginBottom: '10px' }}>
                        <Grid item xs={4}>
                            <h2 style={{ textAlign: 'center', padding: 10, color: '#424242' }}>
                                1. Ưu tiên hàng đầu sự an toàn của trẻ
                            </h2>
                        </Grid>
                        <Grid item xs={8} style={{ padding: '10px 20px', backgroundColor: '#a7ffeb' }}>
                            <p>
                                Mỗi ngày, khi trẻ đang học tập và phát triển tại trường, bạn hoàn toàn có thể cảm nhận
                                được con mình được bảo vệ an toàn, được thoải mái và được chăm sóc tận tình. Smart
                                Kindergarten áp dụng các biện pháp bảo đảm an toàn chặt chẽ như: kiểm tra thường xuyên
                                toàn bộ trường học theo danh mục bao gồm hơn 100 hạng mục để kiểm soát chất lượng cơ sở
                                vật chất, công cụ giảng dạy, vui chơi và học tập tại trường; thực hiện thủ tục rà soát
                                nghiêm ngặt khi tuyển dụng giáo viên và nhân sự làm việc tại trường, là quy trình tuyển
                                dụng và kiểm tra về nhân thân khắt khe nhất dành cho trường mầm non và lần đầu tiên áp
                                dụng tại Smart Kindergarten.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container style={{ backgroundColor: '#80d8ff', marginBottom: '10px' }}>
                        <Grid item xs={8} style={{ padding: '10px 20px', backgroundColor: '#a7ffeb' }}>
                            <p>
                                So với các chương trình mầm non thông thường, Smart Kindergarten đem đến cho trẻ kết quả
                                học tập cao hơn về toán, ngôn ngữ và các kỹ năng khác nhờ vào chương trình học được
                                thiết kế đặc sắc. Chương trình tại Smart Kindergarten là chương trình dựa trên sự tích
                                hợp các cách tiếp cận giáo dục đỉnh cao trong giáo dục đầu đời hiện nay: Thuyết Trí
                                Thông Minh Đa Dạng của Howard Gardner; Cách Tiếp cận Dự án (Project approach) của Lilian
                                Katz (Mỹ); Phương pháp Montessori, Cách tiếp cận Reggio Emilia xuất phát từ Ý; và lý
                                thuyết Giáo dục Kỹ năng Cảm xúc Xã hội (SEL). Các cách tiếp cận này thể hiện mạnh mẽ
                                nguyên tắc dạy học tích cực và lấy trẻ làm trung tâm, giúp trẻ phát triển tối đa khả
                                năng tư duy độc lập, khả năng giải quyết vấn đề, năng lực sáng tạo cũng như khả năng hợp
                                tác.
                            </p>
                        </Grid>
                        <Grid item xs={4}>
                            <h2 style={{ textAlign: 'center', padding: 10, color: '#424242' }}>
                                2. Cung cấp chương trình học thuật cấp tiến nhất
                            </h2>
                        </Grid>
                    </Grid>
                    <Grid container style={{ backgroundColor: '#80d8ff', marginBottom: '10px' }}>
                        <Grid item xs={4}>
                            <h2 style={{ textAlign: 'center', padding: 10, color: '#424242' }}>
                                3. Chăm sóc chu đáo về dinh dưỡng và sức khỏe
                            </h2>
                        </Grid>
                        <Grid item xs={8} style={{ padding: '10px 20px', backgroundColor: '#a7ffeb' }}>
                            <p>
                                Dinh dưỡng không chỉ quan trọng cho sự phát triển về chiều cao, cân nặng, mà còn là yếu
                                tố không thể thiếu cho sự phát triển của não bộ và tư duy. Hoạt động của não bộ tiêu tốn
                                rất nhiều năng lượng. Não tiêu thụ 20% toàn bộ năng lượng hoạt động của cơ thể. Tại
                                Smart Kindergarten, trẻ được cung cấp một chế độ dinh dưỡng cân bằng bao gồm đầy đủ các
                                chất đạm, béo, tinh bột, trái cây tươi và rau quả. Bếp ăn Smart Kindergarten được tổ
                                chức nấu tại trường để đảm bảo sự tươi ngon và an toàn.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container style={{ backgroundColor: '#80d8ff', marginBottom: '10px' }}>
                        <Grid item xs={8} style={{ padding: '10px 20px', backgroundColor: '#a7ffeb' }}>
                            <p>
                                Với 100% giáo viên và nhân viên giáo vụ có bằng Cử nhân Sư phạm Mầm non, đội ngũ nhân
                                viên và giáo viên Smart Kindergarten là những cá nhân ưu tú, hằng ngày luôn theo sát con
                                bạn, hướng dẫn và khuyến khích sự phát triển cả về thể chất lẫn tinh thần ở trẻ. Smart
                                Kindergarten rất thận trọng và khắt khe trong việc tuyển chọn những người tham gia đội
                                ngũ nhân sự tại trường, đồng thời tạo điều kiện tốt nhất cho giáo viên liên tục phát
                                triển về chuyên môn. Vì thế, Smart Kindergarten luôn dành ra khoản kinh phí lớn cho các
                                hội thảo chuyên đề, tổ chức huấn luyện chuyên môn, cung cấp nguồn tài liệu và công cụ
                                dạy học cho giáo viên. Ngoài ra, với chế độ và phúc lợi cao tại Smart Kindergarten, giáo
                                viên luôn cảm thấy hài lòng và yên tâm làm việc.
                            </p>
                        </Grid>
                        <Grid item xs={4}>
                            <h2 style={{ textAlign: 'center', padding: 10, color: '#424242' }}>
                                4. Đầu tư chuyên môn cho đội ngũ giáo viên ưu tú
                            </h2>
                        </Grid>
                    </Grid>
                    <Grid container style={{ backgroundColor: '#80d8ff', marginBottom: '10px' }}>
                        <Grid item xs={4}>
                            <h2 style={{ textAlign: 'center', padding: 10, color: '#424242' }}>
                                5. Tối ưu cơ sở vật chất và đổi mới công cụ giảng dạy
                            </h2>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            style={{ padding: '10px 20px', backgroundColor: '#a7ffeb', display: 'block' }}
                        >
                            <p>
                                Trường mầm non Smart Kindergarten có đủ không gian rộng rãi dành cho các phòng học và
                                các khu chức năng. Được tư vấn thiết kế bởi những chuyên gia thiết kế trường học chuyên
                                nghiệp, Smart Kindergarten xây dựng môi trường học tập giúp trẻ có thể phát triển mạnh
                                mẽ về trí tuệ lẫn tinh thần. Từng lớp học cũng như mỗi góc học tập đều có bố cục, không
                                gian và màu sắc sống động, tạo nên cảm giác hưng phấn, kích thích não bộ trẻ đón nhận
                                những điều mới lạ.
                            </p>
                            <p>
                                Công cụ giảng dạy và học tập cũng được đầu tư rất lớn. Đồ chơi, dụng cụ học tập của trẻ
                                được sản xuất từ nguồn có kiểm định nghiêm ngặt theo tiêu chuẩn dành cho trẻ em mầm non.
                                Nhà trường không sử dụng các đồ chơi được sản xuất trôi nổi trên thị trường.
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default WhyChoose;
