import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

import { ManageCampaignRoutingModule } from './manage-campaign-routing.module';
import { HomeManageCampaignComponent } from './home-manage-campaign/home-manage-campaign.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatDatepickerModule, MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ScheduleDeviceComponent } from '../../shared/components/schedule-device/schedule-device.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// import ngx-translate and the http loader
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateCampaignComponent, HomeManageCampaignComponent, ScheduleDeviceComponent],
  imports: [
    CommonModule,
    ManageCampaignRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslateModule.forChild()

  ]
})
export class ManageCampaignModule { }
