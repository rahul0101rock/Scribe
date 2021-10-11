import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, {
    path: 'login', component: LoginComponent
  }, {
    path: 'home', component: HomeComponent
  }, {
    path: 'myblogs', component: MyblogsComponent, canActivate: [AuthGuard]
  },{
    path: 'edit-profile/:id', component: EditProfileComponent
  },{
    path: 'profile/:id', component: ProfileComponent
  },{
    path: 'view/:postId', component: ViewComponent
  }, {
    path: '**', redirectTo: 'home'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
