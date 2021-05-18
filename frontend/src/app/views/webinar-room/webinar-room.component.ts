import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-webinar-room',
  templateUrl: './webinar-room.component.html',
  styleUrls: ['./webinar-room.component.scss']
})
export class WebinarRoomComponent implements OnInit {
  roomNom: any;


  constructor(private route: ActivatedRoute,  private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.roomNom = params.id;
    });
  }
}
