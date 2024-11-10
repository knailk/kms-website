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
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function CourseInfo() {
    const showAlert = useAlert();
    const [classes, setClasses] = React.useState([]);
    const location = useLocation();

    React.useEffect(() => {
        // Fetch classes data
        request
            .get('/classes?limit=100&page=1')
            .then((response) => {
                const res = response.data.classes.map((item) => ({
                    ...item,
                    fromDate: ToTime(item.fromDate),
                    toDate: ToTime(item.toDate),
                    imgPath: 'https://picsum.photos/id/' + Math.floor(Math.random() * 1000) + '/200/300',
                }));
                setClasses(res);
            })
            .catch(() => {
                showAlert('Không tìm thấy thông tin lớp học', 'error');
            });
    }, []);

    React.useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const scrollToElement = () => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
                } else {
                    // Try again after 100ms if the element is not found
                    setTimeout(scrollToElement, 500);
                }
            };
            scrollToElement();
        }
    }, [location, classes]);

    return (
        <div className="container">
            <CourseBanner />
            <CourseClass classes={classes} />
            <CourseList classes={classes} />
            <RegisterClass classes={classes} />
        </div>
    );
}

export default CourseInfo;
