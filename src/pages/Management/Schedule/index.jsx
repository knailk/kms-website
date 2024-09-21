import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';
import ClassCalendar from '~/components/ClassCalendar';

const cx = classNames.bind(styles);
export default function Schedule() {
    return (
        <>
            <h2 className={cx('title')}>Thời gian biểu lớp học</h2>
            <ClassCalendar allowModify={false} />
        </>
    );
}
