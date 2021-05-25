import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-conform-email',
  templateUrl: './conform-email.component.html',
  styleUrls: ['./conform-email.component.scss']
})
export class ConformEmailComponent implements OnInit {
  email: string;
  code: string;
  private returnUrl: any;
  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params);
        this.email = params.get('email');
      });
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  ngOnInit(): void {
  }

  async sendCode(): Promise<void> {
    this.authService.conformEmail(this.code).subscribe((data: any) => console.log(this.code));
  }
}
