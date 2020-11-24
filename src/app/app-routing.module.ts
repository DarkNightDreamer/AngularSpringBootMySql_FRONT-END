import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUserComponent} from './users/list-user/list-user.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './shared/auth/authentication.guard';


const routes: Routes = [
  {path: 'list-user', component: ListUserComponent, canActivate: [AuthenticationGuard]},
  {path: 'new-user', component: AddUserComponent, canActivate: [AuthenticationGuard]},
  {path: 'edit-user/:id', component: AddUserComponent, canActivate: [AuthenticationGuard]},
  {path: '', redirectTo: 'list-user', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
