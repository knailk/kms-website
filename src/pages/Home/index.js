import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Banner from './Banner';
import Admissions from './Admissions';
import News from './News';
import WhyChoose from './WhyChoose';
import TeacherTeam from './TeacherTeam';
import CanLearn from './CanLearn';
import { Divider, Stack } from '@mui/material';
import BoxChat from '~/components/BoxChat';
const cx = classNames.bind(styles);

function Home() {
    return (
        <Stack className={cx('container')} >
            {/*<BoxChat />*/}
            <Banner />
            <Stack sx={{px:"40px"}}>
                <Divider />
                <Admissions />
                {/*<Divider />*/}
                <News />

                <WhyChoose />
                {/*<Divider />*/}

            </Stack>
            <TeacherTeam />
            <Divider />
            <CanLearn />
        </Stack>
    );
}

export default Home;
