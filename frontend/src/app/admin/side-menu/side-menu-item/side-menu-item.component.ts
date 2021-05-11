import {Component, Input, OnInit} from '@angular/core';
import {MyRoute} from '../../routing-map';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.sass']
})
export class SideMenuItemComponent implements OnInit {
  @Input() route: MyRoute = {route: '', checked: false, subroutes: [], name: ''};
  constructor() { }

  ngOnInit(): void {
  }

}
