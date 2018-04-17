import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../services/token.service';
import { Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenServ:TokenService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

      if(!this.tokenServ.loggedIn())
      {
        this.router.navigate(['about']);
        return false;
      }else
      {
        return true;
      }

  }
}
