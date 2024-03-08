import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    ];
    return (
        <div className={cx('header-wrapper')}>
            <Row className={cx('contact-infor')}>
                <Col xs={8}></Col>
                <Col xs={2}>0981710152</Col>
                <Col xs={2}>
                    <FontAwesomeIcon icon="fa-regular fa-envelope" />
                    tranminhtoan.149@gmail.com
                </Col>
            </Row>
            <Row className={cx('header')}>
                <Col className={cx('logo')} xs={2}>
                    Logo
                </Col>
                <Col xs={8}></Col>
                <Col className={cx('auth-btn')} xs={2}>
                    Login/Register
                </Col>
            </Row>
        </div>
    );
}

export default Header;
