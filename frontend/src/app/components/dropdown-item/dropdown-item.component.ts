import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent implements OnInit {
  @Input() header: string;
  @Input() body: string;
  isCollapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
