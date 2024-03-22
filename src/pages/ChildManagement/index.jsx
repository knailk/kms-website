import classNames from 'classnames/bind';
import styles from './ChildManagement.module.scss';
const cx = classNames.bind(styles);

function ChildManagement() {
    return <div className={cx('container')}>Child Management</div>;
}

export default ChildManagement;
