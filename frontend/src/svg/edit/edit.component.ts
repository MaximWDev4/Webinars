import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  @Input() color = 'black';
  @Input() height = '20px';
  @Input() width = '20px';
  constructor() { }

  ngOnInit(): void {
  }

}
