import { Component } from '@angular/core';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'occuspace';

  constructor(
    private service: ApiService,

  ) {
    // Quand l'app s'initialise on récupére la liste des sites
    this.service.getAllSites().subscribe(res => {
      if (res.code === 'OK') {
        sessionStorage.setItem('sites', JSON.stringify(res.data));
      } else if (res.code === 'NOK') {
        console.log(res.messagge);
      }
    });
  }
}
