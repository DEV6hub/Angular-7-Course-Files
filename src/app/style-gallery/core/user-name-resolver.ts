import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { take, map} from 'rxjs/operators';
import { UserInfoService } from '../../core/user-info.service';

@Injectable()
export class UsernameResolver implements Resolve<any> {
  constructor(private userInfoService: UserInfoService) {}

  resolve() {
    return this.userInfoService.getUser().pipe(
      take(1),
      map(data => {
        return data;
      })
    );

  }
}
