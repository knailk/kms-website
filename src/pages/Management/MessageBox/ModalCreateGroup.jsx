import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { Grid } from '@mui/material';
import Avatar from '~/components/Avatar/Avatar';
import { useRef } from 'react';
const cx = classNames.bind(styles);

const BadgeUser = ({ name }) => {
    return (
        <div className={cx('badge-wrapper')}>
            <span>
                <div className={cx('content')}>
                    <div style={{ fontWeight: 700 }}>{name}</div>
                    <div className={cx('delete')}>&#10006;</div>
                </div>
            </span>
        </div>
    );
};

const UserCard = ({ name, avatar }) => {
    return (
        <div className={cx('user-card-wrapper')}>
            <Grid container>
                <Grid item xs={2}>
                    <Avatar src={avatar} width={40} height={40} />
                </Grid>
                <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>
                    {name}
                </Grid>
            </Grid>
        </div>
    );
};

function ModalCreateGroup() {
    const modalRef = useRef();
    const userSelectRef = useRef();
    const userCardRef = useRef();
    return (
        <div className={cx('modal-create-group')} ref={modalRef}>
            <h2 style={{ padding: '8px 0px' }}>Tạo nhóm chat</h2>
            <div className={cx('user-select-wrapper')}>
                <Grid container rowSpacing={1}>
                    <Grid item xs={2} style={{ paddingTop: 15 }}>
                        Đến:
                    </Grid>
                    <Grid item xs={10} className={cx('user-list')} ref={userSelectRef}>
                        <span>
                            <BadgeUser name="Thanh Thúy" />
                            <BadgeUser name="Minh Toàn" />
                            {/* <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" />
                            <BadgeUser name="Trần My" /> */}
                        </span>
                    </Grid>
                </Grid>
            </div>
            <div className={cx('search-result-wrapper')}>
                <div className={cx('card-list')} ref={userCardRef}>
                    <UserCard name="Thanh Thuý" avatar={'https://mui.com/static/images/avatar/1.jpg'} />
                    <UserCard name="Thanh Thuý" avatar={'https://mui.com/static/images/avatar/1.jpg'} />
                    <UserCard name="Thanh Thuý" avatar={'https://mui.com/static/images/avatar/1.jpg'} />
                    <UserCard name="Thanh Thuý" avatar={'https://mui.com/static/images/avatar/1.jpg'} />
                    <UserCard name="Thanh Thuý" avatar={'https://mui.com/static/images/avatar/1.jpg'} />
                </div>
            </div>
        </div>
    );
}

export default ModalCreateGroup;
