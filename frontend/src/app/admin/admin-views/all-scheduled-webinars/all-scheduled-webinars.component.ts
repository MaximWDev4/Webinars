import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-scheduled-webinars',
  templateUrl: './all-scheduled-webinars.component.html',
  styleUrls: ['./all-scheduled-webinars.component.scss']
})
export class AllScheduledWebinarsComponent implements OnInit {
  scheduledWebinars = [
    {
      id: '1',
      name: 'Шахматы',
      time: '05.06.21 20:00',
      url: 'vAwWyibaUK0',
    },
    {
      id: '2',
      name: 'Танки',
      time: '05.06.21 21:00',
      url: 'OpAHNHFfWH4',
    }
  ];
  deleted: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  edit(): any {
  }

  delete(): any {
  }
}
