import Home from '~/pages/Home';
import About from '~/pages/About';
import CourseInfo from '~/pages/CourseInfo';
import News from '~/pages/News';
import Notification from '~/pages/Notifications';
import Auth from '~/pages/Auth'
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/course', component: CourseInfo },
    { path: '/news', component: News },
    { path: '/notification', component: Notification },
];
export const privateRoutes = [];
