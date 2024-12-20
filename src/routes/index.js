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
import AdminClass from '~/pages/AdminManagement/Class';
import General from '~/pages/AdminManagement/General';
import AdminSchedule from '~/pages/AdminManagement/Schedule';
import RequestManagement from '~/pages/AdminManagement/Request';
import CheckInDashboard from '~/pages/Management/CheckIn';
import DishManagement from '~/pages/Management/Dish';
import Menu from '~/pages/Menu';

export const publicRoutes = [
    { path: '/', component: Home, requireAuth: false },
    { path: '/about', component: About, requireAuth: false },
    { path: '/course', component: CourseInfo, requireAuth: false },
    { path: '/news', component: News, requireAuth: false },
    { path: '/notification', component: Notification, requireAuth: false },
    { path: '/menu', component: Menu, requireAuth: false },
    { path: '/schedule', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/road-map', component: RoadMap, layout: LoggedLayout, requireAuth: true },
    { path: '/message', component: MessageBox, layout: LoggedLayout, requireAuth: true },
    { path: '/list-student', component: ListStudent, layout: LoggedLayout, requireAuth: true },
    { path: '/check-in', component: CheckInDashboard, layout: LoggedLayout, requireAuth: true },
    // { path: '/score-table', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/profile', component: Profile, layout: LoggedLayout, requireAuth: true },
    { path: '/payment', component: Schedule, layout: LoggedLayout, requireAuth: true },
    { path: '/dish', component: DishManagement, layout: LoggedLayout, requireAuth: true },
    { path: '/logout', component: Schedule, layout: LoggedLayout, requireAuth: true },

    { path: '/admin', component: General, layout: LoggedLayout, requireAuth: true },
    { path: '/admin/class', component: AdminClass, layout: LoggedLayout, requireAuth: true },
    { path: '/admin/schedule', component: AdminSchedule, layout: LoggedLayout, requireAuth: true },
    { path: '/admin/message', component: MessageBox, layout: LoggedLayout, requireAuth: true },
    { path: '/admin/request', component: RequestManagement, layout: LoggedLayout, requireAuth: true },
    { path: '/admin/dish', component: DishManagement, layout: LoggedLayout, requireAuth: true },
];
export const privateRoutes = [];
