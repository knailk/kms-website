import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import Avatar from '~/components/Avatar/Avatar';
import { memo, useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

const BadgeUser = ({ uid, name, handleRemoveUser }) => {
    return (
        <div className={cx('badge-wrapper')}>
            <span>
                <div className={cx('content')}>
                    <div style={{ fontWeight: 700 }}>{name}</div>
                    <div className={cx('delete')} onClick={() => handleRemoveUser(uid)}>
                        &#10006;
                    </div>
                </div>
            </span>
        </div>
    );
};

const UserCard = ({ uid, name, avatar, handleSelectUser }) => {
    return (
        <div className={cx('user-card-wrapper')} onClick={() => handleSelectUser(uid, name)}>
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

function ModalCreateGroup({ type }) {
    //state for ui
    const userSelectRef = useRef();
    const userCardRef = useRef();
    const userSelectedRef = useRef();
    const textRef = useRef();
    const [showLoading, setShowLoading] = useState(false);
    const [height, setHeight] = useState(0);
    const [widthInputText, setWidthInputText] = useState('10ch');

    //state for data
    const [searchText, setSearchText] = useState('');
    const [userListSearch, setUserListSearch] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    //button handle
    const handleChangeSearch = (text) => {
        setWidthInputText(text.length + 'ch');
        setSearchText(text);
    };

    const handleSelectUser = (uid, name) => {
        setSearchText('');
        setUserListSearch([]);
        setHeight(330 - userSelectRef.current.offsetHeight);
        setSelectedUsers([...selectedUsers, { uid, name }]);
        textRef.current.focus();
    };

    const handleRemoveUser = (uid) => {
        setSelectedUsers(selectedUsers.filter((user) => user.uid !== uid));
    };

    const handleCreateGroup = () => {
        //call api to create group
    };

    const handleEditGroup = () => {
        //call api to edit group
    };

    //render
    useEffect(() => {
        setHeight(330 - userSelectRef.current.offsetHeight);
    }, [widthInputText, selectedUsers]);

    useEffect(() => {
        userSelectRef.current.scrollTop = userSelectRef.current.scrollHeight;
    }, [selectedUsers]);

    //search after 1s since user stop typing
    useEffect(() => {
        if (searchText === '') {
            setUserListSearch([]);
            return;
        }
        setShowLoading(true);
        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            //
            // setUserListSearch(response.data);
            setUserListSearch([
                { uid: '1', name: 'Thanh Thúy', avatar: 'https://mui.com/static/images/avatar/1.jpg' },
                { uid: '2', name: 'Minh Toàn', avatar: 'https://mui.com/static/images/avatar/2.jpg' },
                { uid: '3', name: 'Tiến Dũng', avatar: 'https://mui.com/static/images/avatar/3.jpg' },
                { uid: '4', name: 'Nhật Hoàng', avatar: 'https://mui.com/static/images/avatar/4.jpg' },
                { uid: '5', name: 'Quyết Thắng', avatar: 'https://mui.com/static/images/avatar/5.jpg' },
                { uid: '6', name: 'Trần Minh Toàn', avatar: 'https://mui.com/static/images/avatar/6.jpg' },
                { uid: '7', name: 'Diễm My', avatar: 'https://mui.com/static/images/avatar/7.jpg' },
            ]);
            setHeight(330 - userSelectRef.current.offsetHeight);
            setShowLoading(false);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    useEffect(() => {
        if (type === 'edit') {
            //call api to get user list of group
            setSelectedUsers([
                { id: '1', name: 'Thanh Thúy' },
                { id: '2', name: 'Minh Toàn' },
            ]);
        }
    }, [type]);

    return (
        <div className={cx('modal-create-group')}>
            <h2 style={{ padding: '8px 0px' }}>
                {type === 'create' && 'Tạo nhóm chat'}
                {type === 'edit' && 'Chỉnh sửa thành viên'}
            </h2>
            <div className={cx('user-select-wrapper')}>
                <Grid container rowSpacing={1}>
                    <Grid item xs={2} style={{ paddingTop: 15 }}>
                        Đến:
                    </Grid>
                    <Grid item xs={10} className={cx('user-list')} ref={userSelectRef}>
                        <span ref={userSelectedRef}>
                            {selectedUsers &&
                                selectedUsers.map((user, index) => (
                                    <BadgeUser
                                        key={index}
                                        uid={user.uid}
                                        name={user.name}
                                        handleRemoveUser={handleRemoveUser}
                                    />
                                ))}
                        </span>
                        <TextField
                            id="standard-basic"
                            label=""
                            variant="standard"
                            sx={{
                                '& .MuiInputBase-root::before': { content: 'none' },
                                '& .MuiInputBase-root::after': { content: 'none' },
                                margin: '4px',
                                width: widthInputText,
                                maxWidth: '270px',
                                minWidth: '40px',
                            }}
                            value={searchText}
                            inputRef={textRef}
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx('search-result-wrapper')}>
                <div
                    className={cx('card-list', { 'show-loading': showLoading })}
                    ref={userCardRef}
                    style={{ height: height }}
                >
                    {userListSearch &&
                        userListSearch.map((user, index) => (
                            <UserCard
                                key={index}
                                uid={user.uid}
                                name={user.name}
                                avatar={user.avatar}
                                handleSelectUser={handleSelectUser}
                            />
                        ))}
                    {showLoading && <CircularProgress className={cx('loading-search')} />}
                </div>
            </div>
            <div className={cx('btn-create-wrapper')}>
                {type === 'create' && (
                    <Button variant="text" disabled={selectedUsers.length <= 0} onClick={handleCreateGroup}>
                        Tạo nhóm
                    </Button>
                )}
                {type === 'edit' && (
                    <Button variant="text" disabled={selectedUsers.length <= 0} onClick={handleEditGroup}>
                        Lưu thay đổi
                    </Button>
                )}
            </div>
        </div>
    );
}

export default memo(ModalCreateGroup);
