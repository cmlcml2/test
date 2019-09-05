import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  public logout() {
    // this.auth.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
