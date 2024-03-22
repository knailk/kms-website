import CourseBanner from '~/pages/CourseInfo/CourseBanner';
import Banner from '~/pages/Home/Banner';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import CourseClass from '~/pages/CourseInfo/CourseClass';
import CourseList from '~/pages/CourseInfo/CourseList';

function CourseInfo() {
    const styleBg = {
        background: 'url(images/blue.png)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingTop:"40px",
        paddingBottom:'50px',
    };
    return (
        <Stack>
            <CourseBanner />

            <CourseClass />
            <div style={styleBg}>
                <CourseList />
            </div>
        </Stack>
    );
}

export default CourseInfo;
