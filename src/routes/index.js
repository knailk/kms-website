import Home from '~/pages/Home';
import About from '~/pages/About';
import CourseInfo from '~/pages/CourseInfo';
import News from '~/pages/News';
import Notification from '~/pages/Notifications';
import { LoggedLayout } from '~/components/Layout';
import Schedule from '~/pages/Management/Schedule';
import Profile from '~/pages/Management/Profile';
import MessageBox from '~/pages/Management/MessageBox';
import ListStudent from '~/pages/Management/ListStudents';
import RoadMap from '~/pages/Management/RoadMap';
import Class from '~/pages/AdminManagement/Class';

export const publicRoutes = [
    { path: '/', component: Home, requireAuth: false },
    { path: '/about', component: About, requireAuth: false },
    { path: '/course', component: CourseInfo, requireAuth: false },
    { path: '/news', component: News, requireAuth: false },
    { path: '/notification', component: Notification, requireAuth: false },
    { path: '/schedule', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/road-map', component: RoadMap, layout: LoggedLayout, requireAuth: true },
    { path: '/message', component: MessageBox, layout: LoggedLayout, requireAuth: true },
    { path: '/list-student', component: ListStudent, layout: LoggedLayout, requireAuth: true },
    { path: '/score-table', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/profile', component: Profile, layout: LoggedLayout, requireAuth: true },
    { path: '/payment', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/food-menu', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/logout', component: Schedule, layout: LoggedLayout, requireAuth: true },

    { path: '/admin/class', component: Class, layout: LoggedLayout, requireAuth: true },
];
export const privateRoutes = [];
