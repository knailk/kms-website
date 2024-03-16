import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button, Grid } from '@mui/material';
import { Check } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
const cx = classNames.bind(styles);

function WhyChoose() {
    return (
        <Grid
            container
            spacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowSpacing={2}
            className={cx('why-chooese')}
            sx={{px:"80px"}}
        >
            <Grid item xs={6} className={cx('why-choose')}>
                <div className={cx('title')}>
                    <div>Tại sao chọn</div>
                    <h2>Lý do chọn StarKids</h2>
                </div>
                <ul className={cx('list-items')}>
                    <li className={cx('item')}>
                        <Check sx={{color:'white'}}/>
                        <Typography sx={{color:'white', ml:1}}>Ưu tiên hàng đầu sự an toàn của trẻ</Typography>
                    </li>
                    <li className={cx('item')}>
                        <Check sx={{color:'white'}}/>
                        <Typography sx={{color:'white', ml:1}}>Cung cấp chương trình học thuật cấp tiến nhất</Typography>
                    </li>
                    <li className={cx('item')}>
                        <Check sx={{color:'white'}}/>
                        <Typography sx={{color:'white', ml:1}}>Chăm sóc chu đáo về dinh dưỡng và sức khỏe</Typography>
                    </li>
                    <li className={cx('item')}>
                        <Check sx={{color:'white'}}/>
                        <Typography sx={{color:'white', ml:1}}>Đầu tư chuyên môn cho đội ngũ giáo viên ưu tú</Typography>
                    </li>
                    <li className={cx('item')}>
                        <Check sx={{color:'white'}}/>
                        <Typography sx={{color:'white', ml:1}}>Tối ưu cơ sở vật chất và đổi mới công cụ giảng dạy</Typography>
                    </li>
                </ul>

                <Button variant="contained" className={cx('button')}>
                    Xem Thêm
                </Button>
            </Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}

export default WhyChoose;
