import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conform-email',
  templateUrl: './conform-email.component.html',
  styleUrls: ['./conform-email.component.scss']
})
export class ConformEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async sendCode(): Promise<void> {

  }
}
