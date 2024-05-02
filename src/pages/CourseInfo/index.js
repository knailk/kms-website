import classNames from 'classnames/bind';
import CourseBanner from './CourseBanner';
import CourseClass from './CourseClass';
import CourseList from './CourseList';
import styles from './Course.module.scss';

const cx = classNames.bind(styles);

function CourseInfo() {
    return (
        <div className={cx('container')}>
            <CourseBanner />
            <CourseClass />
            <CourseList />
        </div>
    );
}

export default CourseInfo;
