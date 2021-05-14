import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  @Input() color = 'black';
  @Input() height = '20px';
  @Input() width = '20px';
  constructor() { }

  ngOnInit(): void {
  }

}
