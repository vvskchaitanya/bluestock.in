import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path: 'admin', component:AdminComponent},
    {path: 'user', component:UserComponent}
];
