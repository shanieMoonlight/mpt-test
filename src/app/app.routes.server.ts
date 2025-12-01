import { RenderMode, ServerRoute } from '@angular/ssr';
import { MptAppRouteDefs } from './app-route-defs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: `${MptAppRouteDefs.route('survey-detail')}/:${MptAppRouteDefs.DETAIL_ID_PARAM}`,
    renderMode: RenderMode.Client
  },
];
