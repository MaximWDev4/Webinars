import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {InfoService} from '../../_services/info.service';

@Component({
  selector: 'app-conform-email',
  templateUrl: './conform-email.component.html',
  styleUrls: ['./conform-email.component.scss']
})
export class ConformEmailComponent implements OnInit {
  email: string;
  code: string;
  private returnUrl: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private info: InfoService) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.email = params.get('email');
      });
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  ngOnInit(): void {
  }

  async sendCode(): Promise<void> {
    console.log(this.code);
    this.authService.conformEmail(this.code).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.info.infoChange(data.message);
      }
    });
  }
}
