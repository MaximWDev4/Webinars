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
      name: 'Быстрый старт - как за 3 месяца заработать $4105',
      time: '05.06.21 20:00',
      url: 'u0UzZKPJEpc',
    },
    {
      id: '2',
      name: 'Презентация круизного клуба InCruises за 10 минут',
      time: '05.06.21 21:00',
      url: 'VFu8035iR1E',
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
