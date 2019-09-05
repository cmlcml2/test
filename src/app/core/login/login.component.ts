import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showFormInDev: boolean;
  isLoading: boolean;
  error: string;
  timerSub: any;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isLoading = false;

    // get return url from route parameters or default to '/'
    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (environment.MODE === 'dev') {
      this.showFormInDev = true;
    } else {
      this.showFormInDev = false;
      this.onLogonSSO();
    }
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: false
    });
  }

  onLogon() {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          console.log(`${credentials.username} successfully logged in`);
          // this.router.navigate(['/'], { replaceUrl: true });
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(`Login error: ${error}`);
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  onLogonSSO() {
    this.isLoading = true;
    this.authService
      .loginSSO()
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          console.log(`${credentials.username} successfully logged in`);
          // this.router.navigate(['/'], { replaceUrl: true });
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(`Login error: ${error}`);
          this.error = error;
          this.isLoading = false;
        }
      );
  }
}
