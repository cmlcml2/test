import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { HomeManageCampaignComponent } from './home-manage-campaign/home-manage-campaign.component';


const routes: Routes = [
  { path: '', component: HomeManageCampaignComponent, pathMatch: 'full' },
  { path: 'create', component: CreateCampaignComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCampaignRoutingModule { }
