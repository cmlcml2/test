import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public static getLabelSite(label) {
    const site = JSON.parse(sessionStorage.getItem('sites')).find(elm => elm.site_code_legacy === label);
    return site == null ? label : site.siteName;
  }

  public static returnDate(date) {
    return date ? moment(date).format('L') : '';
  }

  public static returnRoundNumber(value, round) {
    return Math.round(value);
  }
}
