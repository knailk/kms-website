import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Button } from '@mui/material';
const cx = classNames.bind(styles);

function PaymentDetail({ paymentId, handleBtnBack }) {
    return (
        <>
            <div className={cx('payment-detail-wrapper')}>
                <Button size="small" color="primary" onClick={handleBtnBack}>
                    Quay lại
                </Button>
                <div className={cx('payment-detail-content')}>
                    <div className={cx('content-left')}></div>
                    <div className={cx('content-right')}></div>
                </div>
            </div>
        </>
    );
}

export default PaymentDetail;
