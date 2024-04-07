import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

export default function Profile() {
    return (
        <>
            <h2 className={cx('title')}>Hồ sơ cá nhân</h2>
            <div className={cx('profile-wrapper')}>
                <div className={cx('background')}>
                    <div
                        className={cx('background-top')}
                        style={{ backgroundImage: "url('/images/bg-profile.jpg')" }}
                    ></div>
                </div>
                <div className={cx('profile-content-wrapper')}>
                    <div className={cx('content-left')}></div>
                    <div className={cx('content-right')}></div>
                </div>
            </div>
        </>
    );
}
