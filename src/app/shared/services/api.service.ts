import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const apiAppURL = environment.APIURLAPP;
const apiAuthURL = environment.APIURLAUTH;


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

  }

  getAllSites(): Observable<any> {
    return this.http.get(`${apiAppURL}/getAllSites`);
  }
  getCurrentCampaign(): Observable<any> {
    return this.http.get(`${apiAppURL}/getCurrentCampaign`);
  }

  getAllCampaign(): Observable<any> {
    return this.http.get(`${apiAppURL}/getAllCampaign`);
  }

  getDetailCampaign(id: number): Observable<any> {
    return this.http.get(`${apiAppURL}/getDetailCampaign?campaignId=${id}`);
  }

  getDetailCampaignWithDates(data): Observable<any> {
    // tslint:disable-next-line: max-line-length
    console.log(data);

    return this.http.get(`${apiAppURL}/getDetailCampaignWithDates?campaignId=${data.campaignId}&dateStart=${data.dateStart}&dateEnd=${data.dateEnd}`);
  }

  createCampaign(data): Observable<any> {
    console.log(data);
    return this.http.post(`${apiAppURL}/createACampaign`, data);
  }

  getCampaignDeviceNotAttached(id: number): Observable<any> {
    return this.http.get(`${apiAppURL}/getCampaignDeviceNotAttached?campaignId=${id}`);
  }

  rattachementDeviceCampaign(data): Observable<any> {
    return this.http.post(`${apiAppURL}/rattachementDeviceCampaign`, data);
  }

}
