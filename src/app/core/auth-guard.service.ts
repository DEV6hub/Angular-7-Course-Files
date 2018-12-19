import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route,	Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserInfoService } from './user-info.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private userInfoService: UserInfoService, private router: Router) {
  }
  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (this.userInfoService.isLoggedIn) {
      return true;
    }
    this.router.navigate([url]);
    return false;
  }
}
