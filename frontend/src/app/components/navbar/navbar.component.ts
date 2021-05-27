import {Component, Input, OnInit, Output} from '@angular/core';
import { Global } from '../../_models/global';
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() elements: {name: string, routerLink: string}[] = [];
  @Input()loginout: string;
  @Output() linkClick = new EventEmitter();
  pushed: boolean = false;

  constructor(public global: Global) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.linkClick.emit('click');
  }
}
