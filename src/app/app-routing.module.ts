import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role-guard.service';
import { LoginComponent } from './core/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: './views/home/home.module#HomeModule',
    // canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['*'] }
  },
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule',
    // canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['*'] }
  },
  {
    path: 'manage',
    loadChildren: './views/manage-campaign/manage-campaign.module#ManageCampaignModule',
    // canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['*'] }
  },
  {
    path: 'result/:id',
    loadChildren: './views/result/result.module#ResultModule',
    // canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['*'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
