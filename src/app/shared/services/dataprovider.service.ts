import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataproviderService {


  campaigns: object;
  campaignsSubject: Subject<object> = new Subject<object>();

  allSite: object;
  allSiteSubject: Subject<object> = new Subject<object>();

  constructor() { }

  emitCampaignsSubject() {
    this.campaignsSubject.next(this.campaigns);
  }

  setCampaigns(data: object) {
    this.campaigns = data;
    this.emitCampaignsSubject();
  }

}
