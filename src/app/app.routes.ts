import { Route } from '@angular/router';
import { MptAppRouteDefs } from './app-route-defs';

export const appRoutes: Route[] = [
    {
        path: MptAppRouteDefs.route('home'),
        loadComponent: () => import('./pages/home/home').then((m) => m.MptHome),
        pathMatch: 'full',
    },
    {
        path: MptAppRouteDefs.route('survey-builder'),
        loadComponent: () => import('./pages/survey-builder/survey-builder').then((m) => m.MptSurveyBuilder),
        pathMatch: 'full',
    },
    {
        path: MptAppRouteDefs.route('survey-list'),
        loadComponent: () => import('./pages/survey-list/survey-list').then((m) => m.MptSurveyList),
        pathMatch: 'full',
    },
    {
        path: `${MptAppRouteDefs.route('survey-detail')}/:${MptAppRouteDefs.DETAIL_ID_PARAM}`,
        loadComponent: () => import('./pages/survey-detail/survey-detail').then((m) => m.MptSurveyDetail),
        pathMatch: 'full',
        
    },
    {
        path: `${MptAppRouteDefs.route('survey-detail')}`,
        loadComponent: () => import('./pages/survey-detail/survey-detail').then((m) => m.MptSurveyDetail),
        pathMatch: 'full',
    },
    {
        path: '',
        redirectTo: MptAppRouteDefs.route('home'),
        pathMatch: 'full',
    },
    //   {
    //     path: '',
    //     loadComponent: () => import('./pages/survey-builder').then((m) => m.MptSurveyBuilder),
    //     pathMatch: 'full',
    //   },
];

