import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Banner from './Banner';
import Admissions from './Admissions';
import News from './News';
import WhyChoose from './WhyChoose';
import TeacherTeam from './TeacherTeam';
import CanLearn from './CanLearn';
import { Divider } from '@mui/material';
import BoxChat from '~/components/BoxChat';
const cx = classNames.bind(styles);

function Home() {
    return <div className={cx('container')}>
        <BoxChat />
        <Banner />
        <Divider />
        <Admissions />
        <Divider />
        <News />
        <Divider />
        <WhyChoose />
        <Divider />
        <TeacherTeam />
        <Divider />
        <CanLearn />

    </div>;
}

export default Home;
