import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { PlaceOutlined, Call } from '@mui/icons-material';
const cx = classNames.bind(styles);
function Footer() {
    return <div className={cx('footer-container')}>
        <div className={cx('footer')}>
            <Grid container
                style={{ margin: '25px 0px 0px 0px' }}
            >
                <Grid item xs={4}>
                    <div className={cx('footer-logo', 'footer-title')}></div>
                </Grid>
                <Grid item xs={3}>
                    <div className={cx('footer-title')} style={{ marginLeft: 20 }}>
                        <p>LIÊN KẾT NHANH</p>
                    </div>

                </Grid>
                <Grid item xs={5}>
                    <div className={cx('footer-title')}>HÌNH ẢNH</div>
                </Grid>
            </Grid>
            <Grid container
                style={{ margin: '0px 0px 25px 0px' }}
            >
                <Grid item xs={4}>
                    <div className={cx('footer-content')}>
                        <ul>
                            <li>
                                <PlaceOutlined />
                                <span>CS1: Tầng trệt Cc Lotus Garden 36 Trịnh Đình Thảo, Phường Hòa Thạnh, Quận Tân Phú</span>
                            </li>
                            <li>
                                <Call />
                                <span>(028) 3976 1377 - (028) 3976 1378 </span>
                            </li>
                            <li>
                                <PlaceOutlined />
                                <span>CS2: 649 Kinh Dương Vương, Phường An Lạc, Quận Bình Tân</span>
                            </li>
                            <li>
                                <Call />
                                <span>(028) 3765 6688 - (028) 3765 6689</span>
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={cx('footer-content', 'fast-link')}>
                        <ul>
                            <li>
                                <a href="/">Trang chủ</a>
                            </li>
                            <li>
                                <a href="/">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="/">Dịch vụ</a>
                            </li>
                            <li>
                                <a href="/">Tin tức</a>
                            </li>
                            <li>
                                <a href="/">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className={cx('footer-content')}>
                        <Grid container spacing={2} className={cx('footer-image')}>
                            <Grid item xs={6}>
                                <div href="">
                                    <img src="images/footer1.jpg" alt="" />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div href="">
                                    <img src="images/footer2.jpg" alt="" />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div href="">
                                    <img src="images/footer3.jpg" alt="" />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div href="">
                                    <img src="images/footer4.jpg" alt="" />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

            </Grid>
        </div>

    </div>;
}

export default Footer;
