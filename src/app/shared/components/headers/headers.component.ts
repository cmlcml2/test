import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


import * as moment from 'moment';


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private adapter: DateAdapter<any>,
    private location: Location,
    public router: Router
  ) {
    if (localStorage.getItem('language') != null) {
      this.translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      this.translate.setDefaultLang('en');
    }
    this.useLanguage(this.translate.getDefaultLang());
  }

  ngOnInit() {
  }

  onHome() {
    return (this.location.path() !== '/home' && this.location.path() !== '' && this.location.path() !== '/');
  }

  onLogin() {
    return (this.location.path().startsWith('/login'));
  }

  public logout() {
    // this.auth.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  goToPreviousPage() {
    this.location.back();
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  public useLanguage(language: string) {
    this.translate.use(language);
    this.adapter.setLocale(language);
    moment.locale(language);
    localStorage.setItem('language', language);
  }

}
