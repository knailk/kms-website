import * as React from 'react';
import classNames from 'classnames/bind';
import CourseBanner from './CourseBanner';
import CourseClass from './CourseClass';
import CourseList from './CourseList';
import RegisterClass from './RegisterClass';
import styles from './Course.module.scss';
import request from '~/utils/http';
import { useAlert } from '~/components/Layout/DefaultLayout/AlertProvider';
import ToTime from '~/utils/convertDateFormat';
import { toDate } from 'date-fns';

const cx = classNames.bind(styles);

function CourseInfo() {
    const showAlert = useAlert();
    const [classes, setClasses] = React.useState([]);

    React.useEffect(() => {
        request
            .get('/classes?limit=100&page=1')
            .then((response) => {
                const res = response.data.classes.map((item) => {
                    return {
                        ...item,
                        fromDate: ToTime(item.fromDate),
                        toDate: ToTime(item.toDate),
                        imgPath: 'https://picsum.photos/id/' + Math.floor(Math.random() * 1000) + '/200/300',
                    };
                });
                setClasses(res);
            })
            .catch((error) => {
                showAlert('Không tìm thấy thông tin lớp học', 'error');
            });
    }, []);
    return (
        <div className={cx('container')}>
            <CourseBanner />
            <CourseClass classes={classes} />
            <CourseList classes={classes} />
            <RegisterClass classes={classes} />
        </div>
    );
}

export default CourseInfo;
