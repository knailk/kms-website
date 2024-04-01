import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { Grid, TextField } from '@mui/material';
import Avatar from '~/components/Avatar/Avatar';
import { useEffect, useRef, useState } from 'react';
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
    //state
    const modalRef = useRef();
    const userSelectRef = useRef();
    const userCardRef = useRef();
    const [height, setHeight] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState([{ name: 'Tran thi ' }]);

    //button handle
    console.log(selectedUser);
    //render
    useEffect(() => {
        setHeight(330 - userSelectRef.current.offsetHeight);
    }, []);
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
                            {selectedUser &&
                                selectedUser.map((user, index) => <BadgeUser key={index} name={user.name} />)}
                        </span>
                        <TextField id="standard-basic" label="" variant="standard" />
                    </Grid>
                </Grid>
            </div>
            <div className={cx('search-result-wrapper')}>
                <div className={cx('card-list')} ref={userCardRef} style={{ maxHeight: height }}>
                    {userList &&
                        userList.map((user, index) => <UserCard key={index} name={user.name} avatar={user.avatar} />)}
                </div>
            </div>
            <div className={cx('btn-create-wrapper')}></div>
        </div>
    );
}

export default ModalCreateGroup;
