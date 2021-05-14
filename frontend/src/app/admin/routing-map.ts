import {ScheduleWebinarComponent} from './admin-views/schedule-webinar/schedule-webinar.component';
import {AllScheduledWebinarsComponent} from './admin-views/all-scheduled-webinars/all-scheduled-webinars.component';
import {UsersComponent} from './admin-views/users/users.component';

export type RouteMap = {
  name: string,
  absoluteRoute: string,
  routeName: string,
  child?: any,
  checked?: boolean,
  image?: string,
  subroutes?: RouteMap[]
};

type RoutingMap = {
  scheduleWebinar: RouteMap,
  allScheduledWebinars: RouteMap,
  users: RouteMap,
};

export type MyRoute = {
  name: string,
  route: string,
  checked?: boolean,
  subroutes?: MyRoute[],
};

export const RoutingMap: RoutingMap = {
  scheduleWebinar: {
    name: 'Запланировать вебинар',
    routeName: 'schedulenew',
    absoluteRoute: '/admin/schedulenew',
    child: ScheduleWebinarComponent,
  },
  allScheduledWebinars: {
    name: 'Все вебинары',
    routeName: 'allscheduled',
    absoluteRoute: '/admin/allscheduled',
    child: AllScheduledWebinarsComponent,
  },
  users: {
    name: 'Пользователи',
    routeName: 'users',
    absoluteRoute: '/admin/users',
    child: UsersComponent,
  }
};
