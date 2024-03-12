import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Banner from './Banner';
import Admissions from './Admissions';
import News from './News';
import WhyChoose from './WhyChoose';
import TeacherTeam from './TeacherTeam';
import { Divider } from '@mui/material';
const cx = classNames.bind(styles);

function Home() {
    return <div className={cx('container')}>
        <Banner />
        <Divider />
        <Admissions />
        <Divider />
        <News />
        <Divider />
        <WhyChoose />
        <Divider />
        <TeacherTeam />

    </div>;
}

export default Home;
