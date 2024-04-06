import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Banner from './Banner';
import Admissions from './Admissions';
import News from './News';
import WhyChoose from './WhyChoose';
import TeacherTeam from './TeacherTeam';
import CanLearn from './CanLearn';
import { Divider } from '@mui/material';
// import BoxChat from '~/components/BoxChat';
const cx = classNames.bind(styles);

function Home() {
    const styleBg = {
        backgroundImage: 'url(images/bghome2.png)',
        // backgroundPositionY: '-100px',
        backgroundSize:'100% 110%'
    }
    return (
        <div>
            {/* <BoxChat /> */}
            <Banner />
            <div style={styleBg}>
                <Admissions />
                <News />
            </div>
            <WhyChoose />
            <Divider />
            <TeacherTeam />
            <Divider />
            <CanLearn />
        </div>
    );
}

export default Home;
