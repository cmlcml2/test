// tslint:disable:variable-name
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._authService.credentials;

    /* GESTION DU ROLE DE L'UTILISATEUR */
    if (!(user.roles && user.roles.every(currentValue => {
      if (!next.data || !next.data.expectedRoles) {
        return true;
      }
      if (next.data.expectedRoles.includes('*')) {
        return true;
      }
      return next.data.expectedRoles.includes(currentValue);
    }))) {
      // navigate to not found page
      this._router.navigate(['/unauthorized'], { replaceUrl: false });
      return false;
    }
    return true;
  }

}
