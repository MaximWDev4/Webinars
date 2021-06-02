import { Component, OnInit } from '@angular/core';
import {WebinarService} from '../../../_services/webinar.service';

@Component({
  selector: 'app-all-scheduled-webinars',
  templateUrl: './all-scheduled-webinars.component.html',
  styleUrls: ['./all-scheduled-webinars.component.scss']
})
export class AllScheduledWebinarsComponent implements OnInit {
  scheduledWebinars: { id: number, chatroomId: number, start_time: number, url: string, name: string }[] = [];
  deleted: boolean;
  constructor(private webinarService: WebinarService) { }

  ngOnInit(): void {
    this.getWebinars();
  }

  getWebinars(): void {
    this.webinarService.getAllWebinars().subscribe((api) => {
      this.scheduledWebinars = api.data;
    });
  }
}
