import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tpm-connect';
  querying = false;
  userForm;
  formMode;
  displayColumns: string[] = ['name', 'email', 'password', 'actions'];
  users: User[];
  databases: { name: string; value: string}[] = [
    { name: 'MySQL', value: 'mysql' },
    { name: 'Maria DB', value: 'mariadb' },
    { name: 'Mongo DB', value: 'mongodb' },
    { name: 'PostgreSQL', value: 'postgresql' },
    { name: 'MsSQL', value: 'mssql' },
  ];

  constructor(private userService: UserService) {
    this.formMode = 'store';
    this.users = [
      { id: 1, name: 'Isaac Sai', email: 'isaacsai030@gmail.com', password: 'password' }
    ];
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('password')
    });

    this.userService.all().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  sendForm(value: any) {
    this.querying = true;
    if (this.formMode === 'update') {
      this.userService.update(value).subscribe((data: User) => {
        console.log(data);
        this.querying = false;
      });
    } else {
      this.userService.store(value).subscribe((data: User) => {
        console.log(data);
        this.querying = false;
      });
    }
  }
}
