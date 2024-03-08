import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Header() {
    const landingPages = [
        {
            title: 'Trang chủ',
            url: '/',
        },
        {
            title: 'Về Chúng Tôi',
            url: '/about',
        },
        {
            title: 'Lớp Học',
            url: '/course',
        },
        {
            title: 'Thông Báo',
            url: '/notification',
        },
        {
            title: 'Tin Tức',
            url: '/news',
        },
    ];
    return (
        <div className={cx('header-wrapper')}>
            <Row className={cx('header-top')}>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className={cx('mail')}>tranminhtoan.149@gmail.com</span>
                </div>
            </Row>
            <Row className={cx('header-bottom')}>
                <div className={cx('header-container')}>
                    <Row>
                        <Col xs={1}></Col>
                        <Col className={cx('logo')} xs={2}>
                            Logo
                        </Col>
                        <Col xs={6} className={cx('list-page-items')}>
                            <ul>
                                {landingPages.map((page, index) => (
                                    <li key={index}>
                                        <Link to={page.url}>{page.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col className={cx('auth-btn')} xs={2}>
                            Login/Register
                        </Col>
                        <Col xs={1}></Col>
                    </Row>
                </div>
            </Row>
        </div>
    );
}

export default Header;
