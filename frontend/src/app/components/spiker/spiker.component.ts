import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spiker',
  templateUrl: './spiker.component.html',
  styleUrls: ['./spiker.component.scss']
})
export class SpikerComponent implements OnInit {
  @Input() spikier: string;
  @Input() spikierText: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
