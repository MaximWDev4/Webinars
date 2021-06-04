import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.userService.getAllUsers().subscribe((api) => {
      this.users = api.data;
    });
  }
}
