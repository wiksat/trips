import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, first } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FireBaseServiceService } from '../services/fire-base-service.service';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // return this.auth.getAuthenticated().pipe(
    // map((user) => {
    //   if (this.auth.userRoles.admin) {
    //     return true;
    //   } else {
    //     this.router.navigate(['']);
    //     return false;
    //   }
    // })
    // );
    const authenticated = await this.auth.getCurrentUser();
    var temp = authenticated as any;
    if (temp == null) {
      this.router.navigate(['']);
      return false;
    }
    const roles = await this.fb.getUserRoles(temp.uid);
    var temp2 = roles as any;
    if (temp2.admin) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FireBaseServiceService
  ) {}
}
