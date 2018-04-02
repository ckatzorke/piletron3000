import { Component, OnInit, OnDestroy } from '@angular/core';
import { PileService } from '../main/pile/pile.service';
import { Observable } from 'rxjs/Observable';
import { PileEntry } from '../main/pile/pile.model';
import { Subscription } from 'rxjs/Subscription';
import { AlternativeService, Alternative } from '../shared/alternative.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-mypile',
  templateUrl: './mypile.component.html',
  styleUrls: ['./mypile.component.css']
})
export class MyPileComponent implements OnInit, OnDestroy {

  profile: Profile;
  entries: Array<PileEntry>;
  sum: number;
  alternatives: Array<Alternative>;
  pileSubscription: Subscription;

  constructor(private pileService: PileService,
    private alternativeService: AlternativeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.profile = data['profile'];
    });
    this.update(this.pileService.pileEntries);
    this.pileSubscription = this.pileService.pile.subscribe((e) => {
      this.update(e);
    });
  }

  update(e: Array<PileEntry>) {
    this.entries = e;
    if (e && e.length > 0) {
      this.sum = this.sumCompletionist();
      this.alternatives = this.alternativeService.findAlternatives(this.sum);
    }
  }

  ngOnDestroy() {
    this.pileSubscription.unsubscribe();
  }

  onRemove(id) {
    this.pileService.remove(id);
  }

  getDaysAsArray(): Array<number> {
    const days = Math.floor(this.sumCompletionist() / 24);
    return new Array(days).fill(1);
  }

  getSummary() {
    let sum = 0;
    let gamertype = '';
    switch (this.profile.gamertype) {
      case Profile.GAMERTYPE_MAIN:
        sum = this.sumMain();
        gamertype = 'main';
        break;
      case Profile.GAMERTYPE_MIXED:
        sum = this.sumMixed();
        gamertype = 'mixed';
        break;
      case Profile.GAMERTYPE_COMPLETIONIST:
        sum = this.sumCompletionist();
        gamertype = 'completionist';
        break;
      default:
        break;

    }
    const days = Math.floor(sum / 24);
    const hours = sum % 24;
    const that_is = days === 0 ? '' : `(that is ${days} day${days > 1 ? 's' : ''} and ${hours} hours) `;

    return `According to your gamer type (${gamertype}), you need to play for ${sum} consecutive hours ${that_is}to finish your pile.`;
  }

  sumCompletionist(): number {
    return this.entries.map((e) => e.gameplayCompletionist).reduce((prev, curr) => prev + curr);
  }
  sumMain(): number {
    return this.entries.map((e) => e.gameplayMain).reduce((prev, curr) => prev + curr);
  }
  sumMixed(): number {
    const complete = this.sumCompletionist();
    const main = this.sumMain();
    const mixed = main + (complete - main) / 2;
    return mixed;
  }
}
