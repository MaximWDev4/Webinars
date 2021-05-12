import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  @Input() color = 'black';
  @Input() height = '20px';
  @Input() width = '20px';
  constructor() { }

  ngOnInit(): void {
  }

}
