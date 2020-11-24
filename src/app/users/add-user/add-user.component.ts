import {Component, OnInit} from '@angular/core';
import {Users} from '../../shared/model/users';
import {UserService} from '../../shared/services/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = new Users();
  roles: any[];
  selectedRole: any;
  confirmmdp: any;
  visible = true;
  constructor(private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {
  }

  ngOnInit() {
    this.roles = [{role: 'ADMIN'}, { role: 'USER'}];
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userService.findById(id).subscribe(res => {
        this.user = res;
        this.selectedRole = this.user.role ==='ADMIN' ? this.roles[0] : this.roles[1];
        this.visible = false;
      }, ex => {
        console.log(ex);
        }
      );
    }
  }

  ajouter() {
    this.user.role = this.selectedRole.role;
    this.userService.save(this.user).subscribe(res => {
        if (res.success) {
          this.messageService.add({severity: 'success', summary: 'succés', detail: res.message});
          this.router.navigate(['/list-user']);
        }  else {
          this.messageService.add({severity: 'warn', summary: 'attention', detail: res.message});
        }
      }, err => {
        this.messageService.add({severity: 'error', summary: 'erreur', detail: 'not effected'});
      }
    );
  }
  modifier() {
    this.user.role = this.selectedRole.role;
    this.userService.update(this.user).subscribe(res => {
        if (res.success) {
          this.messageService.add({severity: 'success', summary: 'succés', detail: res.message});
          this.router.navigate(['/list-user']);
        }  else {
          this.messageService.add({severity: 'warn', summary: 'attention', detail: res.message});
        }
      }, err => {
        this.messageService.add({severity: 'error', summary: 'erreur', detail: 'not effected'});
      }
    );
  }
}
