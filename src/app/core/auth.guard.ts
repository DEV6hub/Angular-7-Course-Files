import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable()
export class AuthGuard implements CanActivate {
  response: any;
  constructor(
    private userInfo: UserInfoService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      if (this.userInfo.isLoggedIn) {
       return true;
      } else {
        window.alert('You don\'t have permission to view this page.Please signup .');
        this.router.navigateByUrl('/home');
        return false;
      }
  }
}
