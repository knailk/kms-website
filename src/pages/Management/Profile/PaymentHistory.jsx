import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import SearchBox from '~/components/SearchBox/SearchBox';
import { Grid, Card, Box, CardContent, Button, Chip, Pagination } from '@mui/material';
const cx = classNames.bind(styles);

const PaymentInforCard = ({ data, handleBtnDetail }) => (
    <Card sx={{ display: 'flex' }} className={cx('card-wrapper')}>
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CardContent sx={{ width: '100%', display: 'flex', padding: '10px 15px !important' }}>
                <div className={cx('payment-infor')}>
                    <div className={cx('title')}>Số hóa đơn</div>
                    <div className={cx('content')}>{data.paymentNumber}</div>
                </div>
                <div className={cx('payment-infor')}>
                    <div className={cx('title')}>Trạng thái</div>
                    <div className={cx('content')}>
                        {data.status === 0 && <Chip label="Đang xử lý" color="primary" />}
                        {data.status === 1 && <Chip label="Đã thanh toán" color="success" />}
                        {data.status === -1 && <Chip label="Thất bại" color="error" />}
                    </div>
                </div>
                <div className={cx('payment-infor')}>
                    <div className={cx('title')}>Tổng số tiền</div>
                    <div className={cx('content')}>{data.total}</div>
                </div>
                <div className={cx('payment-infor')}>
                    <div className={cx('title')}>Ngày tạo</div>
                    <div className={cx('content')}>{data.createdDate}</div>
                </div>
                <div className={cx('payment-infor')}>
                    <div className={cx('title')}>Mô tả</div>
                    <div className={cx('content')}>{data.description}</div>
                </div>
                <div className={cx('payment-infor', 'btn-detail')}>
                    <Button size="small" color="primary" onClick={() => handleBtnDetail(data.paymentNumber)}>
                        Chi tiết
                    </Button>
                </div>
            </CardContent>
        </Box>
    </Card>
);

const dataPaymentHistory = [
    {
        paymentNumber: 'P04092023',
        status: 0,
        total: '12.000.000đ',
        createdDate: '04/09/2023',
        description: 'Đóng học phí tháng 9',
    },
    {
        paymentNumber: 'P04102023',
        status: 1,
        total: '12.000.000đ',
        createdDate: '04/10/2023',
        description: 'Đóng học phí tháng 10',
    },
    {
        paymentNumber: 'P04112023',
        status: -1,
        total: '12.000.000đ',
        createdDate: '04/11/2023',
        description: 'Đóng học phí tháng 11',
    },
    {
        paymentNumber: 'P04122023',
        status: 0,
        total: '12.000.000đ',
        createdDate: '04/12/2023',
        description: 'Đóng học phí tháng 12',
    },
];

function PaymentHistory({ handleBtnDetail }) {
    return (
        <div className={cx('payment-history-wrapper')}>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6} style={{ paddingRight: '30px' }}>
                    <SearchBox />
                </Grid>
            </Grid>
            <div className={cx('list-wrapper')}>
                {dataPaymentHistory.map((item, index) => (
                    <PaymentInforCard key={index} data={item} handleBtnDetail={handleBtnDetail} />
                ))}
            </div>
            <div className={cx('pagination-wrapper')}>
                <Pagination count={10} />
            </div>
        </div>
    );
}

export default PaymentHistory;
