import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/store/auth/auth.state';
import { ROLES } from '@core/constants/enums';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  // return this.store.select(getUser).pipe(
  //   map((user) => {
  //     if (user?.role === 'admin' || user?.role === 'superadmin') {
  //       return true;
  //     } else {
  //       this.router.navigate(['/home']);
  //       return false;
  //     }
  //   })
  // );
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(AuthState.role).pipe(
      map((role) => {
        if (role === ROLES.ADMIN || role === ROLES.SUPERADMIN) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
