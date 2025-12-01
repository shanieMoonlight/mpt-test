import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MptUiRouteCard } from '../../ui/cards/route-card/route-card';
import { MptAppRouteDefs } from '../../app-route-defs';

//######################################//

interface RouteCardConfig {
  title: string;
  route: string;
  icon: string;
}

const ROUTE_CARDS: RouteCardConfig[] = [
  {
    title: 'Survey List',
    route: `/${MptAppRouteDefs.route('survey-list')}`,
    icon: 'assignment'
  },
  {
    title: 'Build Survey',
    route: `/${MptAppRouteDefs.route('survey-builder')}`,
    icon: 'build'
  }
];    

//######################################//

@Component({
  selector: 'mpt-home',
  imports: [MptUiRouteCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MptHome {




  protected _routeCards = ROUTE_CARDS;
}
