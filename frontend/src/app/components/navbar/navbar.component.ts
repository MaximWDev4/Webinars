import {Component, Input, OnInit} from '@angular/core';
import { Global } from '../../_models/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() elements: {name: string, routerLink: string}[] = [];
  pushed: boolean = false;

  constructor(public global: Global) { }

  ngOnInit(): void {
  }

}
