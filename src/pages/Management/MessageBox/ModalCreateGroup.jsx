/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import Avatar from '~/components/Avatar/Avatar';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import request from '~/utils/http';
import { LoggedContext } from '~/components/Layout/LoggedLayout';
import { MessageBoxContext } from '.';
const cx = classNames.bind(styles);

const BadgeUser = ({ username, fullName, handleRemoveUser, type = '' }) => {
    return (
        <div className={cx('badge-wrapper')}>
            <span>
                <div className={cx('content')}>
                    <div style={{ fontWeight: 700 }}>{fullName}</div>
                    {type === 'delete' && (
                        <div className={cx('delete')} onClick={() => handleRemoveUser(username)}>
                            &#10006;
                        </div>
                    )}
                    {type !== 'delete' && (
                        <div className={cx('not-delete')} onClick={() => handleRemoveUser(username)}></div>
                    )}
                </div>
            </span>
        </div>
    );
};

const UserCard = ({ username, fullName, avatar, handleSelectUser }) => {
    return (
        <div className={cx('user-card-wrapper')} onClick={() => handleSelectUser(username, fullName)}>
            <Grid container>
                <Grid item xs={2}>
                    <Avatar src={avatar} width={40} height={40} />
                </Grid>
                <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>
                    {fullName}
                </Grid>
            </Grid>
        </div>
    );
};

function ModalCreateGroup({ type, listMember, groupId, setOpenModal }) {
    //state for ui
    const userSelectRef = useRef();
    const userCardRef = useRef();
    const userSelectedRef = useRef();
    const textRef = useRef();
    const context = useContext(LoggedContext);
    const currUser = context.userInfo.username;
    const [showLoading, setShowLoading] = useState(false);
    const [height, setHeight] = useState(0);
    const [widthInputText, setWidthInputText] = useState('10ch');
    const messageBoxContext = useContext(MessageBoxContext);

    //state for data
    const [searchText, setSearchText] = useState('');
    const [userListSearch, setUserListSearch] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [removedUsers, setRemovedUsers] = useState([]);

    //button handle
    const handleChangeSearch = (text) => {
        setWidthInputText(text.length + 'ch');
        setSearchText(text);
    };

    const handleSelectUser = (username, fullName) => {
        setSearchText('');
        setUserListSearch([]);
        setHeight(330 - userSelectRef.current.offsetHeight);
        setSelectedUsers([...selectedUsers, { username, fullName }]);
        textRef.current.focus();
    };

    const handleRemoveUser = (username) => {
        setSelectedUsers(selectedUsers.filter((user) => user.username !== username));
        setRemovedUsers([...removedUsers, username]);
    };

    const handleCreateGroup = async () => {
        //call api to create group
        let arrUser = selectedUsers.map((user) => user.username);
        try {
            await request
                .post('/chat', { participants: arrUser })
                .then((response) => {
                    context.setShowSnackbar('Tạo nhóm thành công', 'success');
                    messageBoxContext.setOpen(false);
                    messageBoxContext.setReloadData((prev) => !prev);
                })
                .catch((error) => {
                    context.setShowSnackbar('Tạo nhóm thất bại', 'error');
                });
        } catch (error) {}
    };

    const handleEditGroup = () => {
        //call api to edit group
        if (type === 'add') {
            selectedUsers.map((user) => request.put('/chat/member', { chat_id: groupId, username: user.username }));

            setOpenModal(false);
        } else if (type === 'delete') {
            console.log(removedUsers);
        }
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
        setUserListSearch([]);
        if (searchText === '') {
            setUserListSearch([]);
            return;
        }
        setShowLoading(true);
        const delayDebounceFn = setTimeout(() => {
            apiGetUserBySearch(searchText);
            setHeight(330 - userSelectRef.current.offsetHeight);
            setShowLoading(false);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    useEffect(() => {
        if (type === 'delete') {
            // call api to get user list of group
            setSelectedUsers(() => {
                return listMember.map((user) => {
                    return { username: user.username, fullName: user.name };
                });
            });
        }
    }, [type]);

    //get user by search key
    const apiGetUserBySearch = async (searchKey) => {
        //call api to get user by search key
        try {
            await request.get(`/profile?keyword=${searchKey}`).then((response) => {
                if (response.data.users && response.data.users.length > 0) {
                    let data = [];
                    if (selectedUsers && selectedUsers.length > 0) {
                        data = response.data.users.filter(
                            (user) =>
                                selectedUsers.findIndex(
                                    (u) => u.username === user.username && u.username !== currUser,
                                ) === -1,
                        );
                    } else {
                        data = response.data.users;
                    }
                    setUserListSearch(data);
                }
            });
        } catch (error) {
            context.setShowSnackbar('Có lỗi xảy ra', 'error');
            console.log(error);
        }
    };

    return (
        <div className={cx('modal-create-group')}>
            <h2 style={{ padding: '8px 0px' }}>
                {type === 'create' && 'Tạo nhóm chat'}
                {type === 'add' && 'Thêm thành viên'}
                {type === 'delete' && 'Xóa thành viên'}
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
                                        username={user.username}
                                        fullName={user.fullName}
                                        handleRemoveUser={handleRemoveUser}
                                        type={type}
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
                                username={user.username}
                                fullName={user.fullName}
                                avatar={user.pictureURL}
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
                {(type === 'add' || type === 'delete') && (
                    <Button variant="text" disabled={selectedUsers.length <= 0} onClick={handleEditGroup}>
                        Lưu thay đổi
                    </Button>
                )}
            </div>
        </div>
    );
}

export default memo(ModalCreateGroup);
