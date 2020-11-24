import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {Users} from '../../shared/model/users';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
users: Users[];
  constructor(private userService: UserService,
              private messageService: MessageService,
              private confirmService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.userService.getAll().subscribe(data => {
      this.users = (data);
    }, err => {
      console.log(err);
    });
  }
  public supprimer(user) {
    this.confirmService.confirm({
      header: 'Confirmation',
      message: 'Bjadek??Oo',
      accept: () => {
        this.userService.delete(user.id).subscribe(res => {
            if (res.success) {
              this.messageService.add({severity: 'success', summary: 'succés', detail: res.message});
              this.getAll();
            }  else {
              this.messageService.add({severity: 'warn', summary: 'attention', detail: res.message});
            }
          }, err => {
            this.messageService.add({severity: 'error', summary: 'erreur', detail: 'not effected'});
          }
        );
      }
    });
  }
  public editer(user) {
    this.router.navigate(['/edit-user', user.id]);

  }
}
