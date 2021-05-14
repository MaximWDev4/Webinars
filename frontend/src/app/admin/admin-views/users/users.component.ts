import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [{id: 1, userName: 'Dany', email: 'danythedev@gmail.com', licence: 0}, {id: 1, userName: 'Dany', email: 'danythedev@gmail.com', licence: 0}];
  constructor() { }

  ngOnInit(): void {
  }

}
