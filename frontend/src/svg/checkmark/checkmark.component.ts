import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss']
})
export class CheckmarkComponent implements OnInit {

  @Input() color = 'green';
  @Input() height = '20px';
  @Input() width = '20px';

  constructor() { }

  ngOnInit(): void {
  }

}
