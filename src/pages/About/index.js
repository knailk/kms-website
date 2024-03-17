import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { Button, Grid, Divider, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AboutTab from './AboutTab';
import Purpose from './Purpose';
import Vision from './Vision';
import Facility from './Facility';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';
const cx = classNames.bind(styles);
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function About() {
    const [expanded, setExpanded] = useState({ tab1: false, tab2: false, tab3: false, tab4: false, tab5: false });
    const [tab, setTab] = useState('');
    return (
        <div className={cx('container')}>
            <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowSpacing={2}
                style={{ margin: '25px 0px' }}
            >
                <Grid item xs={5} className={cx('banner')}>
                    <div className={cx('title')}>
                        <p>"StarKids là một hệ thống giáo dục tốt nhất trong khu vực"</p>
                    </div>
                    <Button variant="contained" className={cx('button')}>
                        Xem Thêm
                    </Button>
                </Grid>
                <Grid item xs={7}></Grid>
            </Grid>

            <div id="about-tab">
                <Divider />
            </div>
            <Facility />
            {/* <AboutTab /> */}
            <Divider />
            <div className={cx('tab-wrapper')}>
                <h2>Về StarKids</h2>
                <Grid container className={cx('tab-item-container')}>
                    <Grid item className={cx('tab-item')} xs={10} style={{ padding: '15px 30px' }}>
                        Mục tiêu hoạt động
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMore
                            expand={expanded.tab1}
                            onClick={() => setExpanded({ ...expanded, tab1: !expanded.tab1 })}
                            aria-expanded={expanded.tab1}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
                <div>
                    <Collapse in={expanded.tab1} timeout="auto" unmountOnExit className={cx('collapse-content')}>
                        <p>
                            Chương trình phát triển theo hướng tiếp cận tiên tiến, phát huy tối đa kỹ năng tiếp nhận và
                            sáng tạo của trẻ trong giai đoạn 0 - 6 tuổi.
                        </p>
                        <span>Xem thêm</span>
                    </Collapse>
                </div>
                <Grid container className={cx('tab-item-container')}>
                    <Grid item className={cx('tab-item')} xs={10} style={{ padding: '15px 30px' }}>
                        Tầm nhìn
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMore
                            expand={expanded.tab2}
                            onClick={() => setExpanded({ ...expanded, tab2: !expanded.tab2 })}
                            aria-expanded={expanded.tab2}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
                <div>
                    <Collapse in={expanded.tab2} timeout="auto" unmountOnExit className={cx('collapse-content')}>
                        <p>
                            Chương trình giáo dục tại StarKids được phát triển dựa trên sự thấu hiểu rằng trẻ em phát
                            triển trong một tổng hòa phức tạp của các hệ thống có liên quan lẫn nhau, bao gồm gia đình,
                            nhà trường, cộng đồng xung quanh và thế giới.
                        </p>
                        <span>Xem thêm</span>
                    </Collapse>
                </div>
                <Grid container className={cx('tab-item-container')}>
                    <Grid item className={cx('tab-item')} xs={10} style={{ padding: '15px 30px' }}>
                        Cơ sở vật chất
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMore
                            expand={expanded.tab3}
                            onClick={() => setExpanded({ ...expanded, tab3: !expanded.tab3 })}
                            aria-expanded={expanded.tab3}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
                <div>
                    <Collapse in={expanded.tab3} timeout="auto" unmountOnExit className={cx('collapse-content')}>
                        <p>
                            Cở sở StarKids Tân Phú: Tầng trệt Cc Lotus Garden 36 Trịnh Đình Thảo, Phường Hòa Thạnh, Quận
                            Tân Phú.
                        </p>
                        <span>Xem thêm</span>
                    </Collapse>
                </div>
                <Grid container className={cx('tab-item-container')}>
                    <Grid item className={cx('tab-item')} xs={10} style={{ padding: '15px 30px' }}>
                        Đội ngũ giảng dạy
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMore
                            expand={expanded.tab4}
                            onClick={() => setExpanded({ ...expanded, tab4: !expanded.tab4 })}
                            aria-expanded={expanded.tab4}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
                <div>
                    <Collapse in={expanded.tab4} timeout="auto" unmountOnExit className={cx('collapse-content')}>
                        <p>
                            Đội ngũ giáo viên nhiều kinh nghiệm, giàu tình yêu thương và tâm huyết, các cô không chỉ là
                            truyền đạt kiến thức mà còn nuôi dưỡng tình cảm, định hình nhân cách và mở cánh cửa tương
                            lai sáng tươi của các bé.
                        </p>
                        <span>Xem thêm</span>
                    </Collapse>
                </div>
                <Grid container className={cx('tab-item-container')}>
                    <Grid item className={cx('tab-item')} xs={10} style={{ padding: '15px 30px' }}>
                        Lý do chọn StarKids
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMore
                            expand={expanded.tab5}
                            onClick={() => setExpanded({ ...expanded, tab5: !expanded.tab5 })}
                            aria-expanded={expanded.tab5}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
                <div>
                    <Collapse in={expanded.tab5} timeout="auto" unmountOnExit className={cx('collapse-content')}>
                        <ul className={cx('list-items')}>
                            <li className={cx('item')}>
                                <span>Ưu tiên hàng đầu sự an toàn của trẻ</span>
                            </li>
                            <li className={cx('item')}>
                                <span>Cung cấp chương trình học thuật cấp tiến nhất</span>
                            </li>
                            <li className={cx('item')}>
                                <span>Chăm sóc chu đáo về dinh dưỡng và sức khỏe</span>
                            </li>
                            <li className={cx('item')}>
                                <span>Đầu tư chuyên môn cho đội ngũ giáo viên ưu tú</span>
                            </li>
                            <li className={cx('item')}>
                                <span>Tối ưu cơ sở vật chất và đổi mới công cụ giảng dạy</span>
                            </li>
                        </ul>
                        <span>Xem thêm</span>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}

export default About;
