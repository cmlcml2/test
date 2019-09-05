import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DataproviderService } from 'src/app/shared/services/dataprovider.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modeDebug = environment.DEBUG;

  returnDate = UtilService.returnDate;
  getLabelSite = UtilService.getLabelSite;

  campaigns;
  campaignsSubscription: Subscription;
  mobile = false;


  constructor(
    private service: ApiService,
    public snackBar: MatSnackBar,
    public translate: TranslateService,
    private dataProvider: DataproviderService,

  ) {
  }


  ngOnInit() {
    if (window.screen.width === 320 || window.innerWidth <= 575) { // 768px portrait
      this.mobile = true;
    }

    this.getAllCampaign();
    this.campaignsSubscription = this.dataProvider.campaignsSubject.subscribe(
      (res) => {
        this.campaigns = res;
      }
    );
    this.dataProvider.emitCampaignsSubject();
  }


  getAllCampaign() {
    this.service.getAllCampaign().subscribe(res => {
      this.dataProvider.setCampaigns(res.data);
    }, err => {
      console.log(err);
      this.snackBar.open('An error occurred', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }
}
