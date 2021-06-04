import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebinarService} from '../../_services/webinar.service';

@Component({
  selector: 'app-webinar-room',
  templateUrl: './webinar-room.component.html',
  styleUrls: ['./webinar-room.component.scss']
})
export class WebinarRoomComponent implements OnInit {
  roomNom: any;
  webinar: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webinarService: WebinarService
  ) {
    this.route.params.subscribe(params => {
      this.roomNom = params.id;
      this.webinarService.getWebinarById(this.roomNom).subscribe(body => {
        if (body.success) {
          this.webinar = body.data;
        } else {
          router.navigate(['404']);
        }
      });
    });
  }

  ngOnInit(): void {
  }
}
