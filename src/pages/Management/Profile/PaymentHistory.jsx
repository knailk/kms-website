import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import SearchBox from '~/components/SearchBox/SearchBox';
const cx = classNames.bind(styles);

function PaymentHistory() {
    return (
        <div className={cx('payment-history-wrapper')}>
            <SearchBox />
        </div>
    );
}

export default PaymentHistory;
