import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';

export interface User {
  id?: number;
  _id?: number;
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
  formId: number = null;
  db = 'postgresql';
  formMode;
  displayColumns: string[] = ['name', 'email', 'password', 'actions'];
  users: User[];
  databases: { name: string; value: string}[] = [
    { name: 'MySQL', value: 'mysql' },
    { name: 'Maria DB', value: 'mariadb' },
    { name: 'Mongo DB', value: 'mongodb' },
    { name: 'PostgreSQL', value: 'postgresql' },
    { name: 'MsSQL', value: 'mssql' },
    { name: 'Sqlite', value: 'sqlite' }
  ];

  constructor(private userService: UserService) {
    this.formMode = 'store';
    this.users = [];
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('password'),
      connection: new FormControl('connection')
    });

    this.userService.all().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  sendForm(value: any) {
    this.querying = true;
    if (this.formMode === 'update') {
      this.userService.update(this.formId, value).subscribe((data: User) => {
        console.log(data);
        this.querying = false;
        this.userForm.reset();
        alert('User with email: ' + data.email + ' updated successfully');
      }, (error) => {
        alert('Could not update user');
      });
    } else {
      this.userService.store(value).subscribe((data: User) => {
        console.log(data);
        this.querying = false;
        this.userForm.reset();
        alert('User with email: ' + data.email + ' created successfully');
      }, (error) => {
        alert('Could not create user');
      });
    }
  }

  getUsers(db: string) {
    this.db = db;
    this.userService.all(db).subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  editUser(user: User) {
    this.formMode = 'update';
    this.userForm.setValue({
      name: user.name,
      email: user.email,
      password: user.password,
      connection: this.db
    });
    this.formId = user?.id ?? user?._id;
    console.log(user);
    console.log(this.formId);
  }

  deleteUser(user: User) {
    const result = confirm('Are you sure you want to delete ' + user.name + ' ?');
    if (result) {
      this.userService.delete(user?.id ?? user?._id, this.db).subscribe((data) => {
        console.log(data);
      });
    }
  }

  cancelUpdate() {
    this.formMode = 'create';
    this.userForm.reset();
  }
}
