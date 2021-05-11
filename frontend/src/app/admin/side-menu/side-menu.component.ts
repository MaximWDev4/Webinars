import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {MyRoute, RoutingMap} from '../routing-map';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {
  @Input() isShown = false;
  @Input() isHome = true;
  @Output() IsShownChange = new EventEmitter();
  routes: MyRoute[] = [];
  currentRoute: any;
  constructor(
  ) {}

  ngOnInit(): void {
    Object.entries(RoutingMap).map(
      (value, index, array) => {
        const route: MyRoute = {
          name: value[1].name,
          route: value[1].absoluteRoute,
          checked: false,
          subroutes: []
        };
        this.routes.push(route);
        value[1].subroutes?.map((sr) => {
          this.routes[index].subroutes?.push({name: sr.name, route: sr.absoluteRoute});
        });
      }
    );
  }

  closeMe(): void {
    this.IsShownChange.emit();
  }
}
