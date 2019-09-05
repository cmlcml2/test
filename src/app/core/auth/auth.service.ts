// tslint:disable:variable-name
import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Credentials {
  username: string;
  email: string;
  // firstname: string;
  // lastname: string;
  // phone: string;
  token: string;
  roles: string[];
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user'
}


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const credentialsKey = 'credentials';
const apiUrl = environment.APIURLAUTH;

@Injectable()
export class AuthService {
  private _credentials: Credentials | null;

  constructor(private http: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      if (environment.MODE === 'dev') {
        this._credentials = JSON.parse(savedCredentials);
      }
    }
  }

  /**
   * Authenticates the user.
   * @param LoginContext : context The login parameters.
   * @return Observable<Credentials> : The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return new Observable<Credentials>((observer) => {
      this.http.post<User>(apiUrl + '/signin', context, httpOptions)
        .subscribe(
          user => {
            console.log(user);
            const cred: Credentials = {
              username: user.email,
              email: user.email,
              token: user.token,
              // firstname: user.firstname,
              // lastname: user.lastname,
              // phone: user.phone,
              roles: user.roles,
            };
            this.setCredentials(cred, context.remember);
            observer.next(cred);
            observer.complete();
          },
          error => {
            observer.complete();
          });
    });
  }


  /**
   * Authenticates the user.
   * @return Observable<Credentials> : The user credentials.
   */
  loginSSO(): Observable<Credentials> {
    return new Observable<Credentials>((observer) => {
      this.http.get<User>(apiUrl + '/getUserConnected', httpOptions)
        .subscribe(
          user => {
            const cred: Credentials = {
              username: user.email,
              email: user.email,
              token: user.token,
              // firstname: user.firstname,
              // lastname: user.lastname,
              // phone: user.phone,
              roles: user.roles,
            };
            this.setCredentials(cred, false);
            observer.next(cred);
            observer.complete();
          },
          error => {
            observer.complete();
          });
    });
  }

  /**
   * Logs out the user and clear credentials.
   * @return Observable<boolean> : True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return boolean : True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return Credentials : The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param Credentials : credentials The user credentials.
   * @param boolean : remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }


  /**
   * Gets indicator if user has role .
   */
  public hasRoles(role: ROLES): boolean {
    if (this.isAuthenticated() && this.credentials.roles) {
      return this.credentials.roles.includes(role);
    }
    return false;
  }
}
