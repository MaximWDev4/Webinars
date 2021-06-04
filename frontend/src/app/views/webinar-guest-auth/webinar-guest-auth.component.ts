import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebinarService} from '../../_services/webinar.service';
import {UserService} from '../../_services/user.service';
import {ErrorService} from '../../_services/error.service';
import {InfoService} from '../../_services/info.service';

@Component({
  selector: 'app-webinar-guest-auth',
  templateUrl: './webinar-guest-auth.component.html',
  styleUrls: ['./webinar-guest-auth.component.scss']
})
export class WebinarGuestAuthComponent implements OnInit {
  id: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private error: ErrorService,
    private info: InfoService,
    private webinarService: WebinarService
  ) {
    this.route.params.subscribe(params => {
      const roomNom = params.id;
      this.id = roomNom;
      this.webinarService.getWebinarById(roomNom).subscribe(body => {
        if (body.success) {
          userService.guestCheck({id: params.id, email: decodeURIComponent(params.email)}).subscribe((response) => {
            localStorage.removeItem('guest');
            if (response.success) {
               localStorage.setItem('guest', 'true');
               localStorage.setItem('email', response.data.email);
               localStorage.setItem('userName', response.data.userName);
              }
            },
            e => {this.error.errorChange(e); },
            () => {
                if (localStorage.getItem('guest') === 'true') {
                  this.info.infoChange('Вы вошли под именем ' + localStorage.getItem('userName'));
                  router.navigate(['webinar', params.id]);
                } else {
                  this.error.errorChange('К сожалению эта ссылка не действительна');
                  router.navigate(['404']);
                }
            }
          );
        } else {
          router.navigate(['404']);
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
