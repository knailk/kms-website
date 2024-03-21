import Home from '~/pages/Home';
import About from '~/pages/About';
import CourseInfo from '~/pages/CourseInfo';
import News from '~/pages/News';
import Notification from '~/pages/Notifications';
import { LoggedLayout } from '~/components/Layout';
import Schedule from '~/components/Schedule';
import Profile from '~/components/Profile';
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/course', component: CourseInfo },
    { path: '/news', component: News },
    { path: '/notification', component: Notification },
    { path: '/management', component: Schedule, layout: LoggedLayout },
    { path: '/message', component: Schedule, layout: LoggedLayout },
    { path: '/list-student', component: Schedule, layout: LoggedLayout },
    { path: '/score-table', component: Schedule, layout: LoggedLayout },
    { path: '/profile', component: Profile, layout: LoggedLayout },
    { path: '/payment', component: Schedule, layout: LoggedLayout },
    { path: '/food-menu', component: Schedule, layout: LoggedLayout },
    { path: '/logout', component: Schedule, layout: LoggedLayout },
];
export const privateRoutes = [];
