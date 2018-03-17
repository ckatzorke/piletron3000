import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { PileEntry } from '../main/pile/pile.model';
import { PileService } from '../main/pile/pile.service';


@Injectable()
export class PileResolver implements Resolve<PileEntry[]> {

  constructor(private pileService: PileService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PileEntry[]> | Promise<PileEntry[]> | PileEntry[] {
    return this.pileService.pile;
  }
}
