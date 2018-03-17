import { Component, OnInit, OnDestroy } from '@angular/core';
import { PileService } from './pile.service';
import { PileEntry } from './pile.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css']
})
export class PileComponent implements OnInit, OnDestroy {

  entries = new Array<PileEntry>();
  pileSubscription: Subscription;

  gameplayMain = 0;
  gameplayCompletionist = 0;

  constructor(private pileService: PileService) { }

  ngOnInit() {
    this.entries = this.pileService.pileEntries;
    this.pileSubscription = this.pileService.pile.subscribe((e) => {
      this.entries = e;
      this.sumMain();
      this.sumCompletionist();
    });
  }

  ngOnDestroy() {
    this.pileSubscription.unsubscribe();
  }


  showGameplayTimeDays(): string {
    const time = Math.floor(this.gameplayCompletionist / 24);
    return time + ' day' + this.suffix(time);
  }

  showGameplayTimeHours(): string {
    const time = this.gameplayCompletionist % 24;
    return time + ' hour' + this.suffix(time);
  }

  suffix(time) {
    let suffix = '';
    if (time !== 1) {
      suffix = 's';
    }
    return suffix;
  }

  showGameplayTime() {
    const main = this.gameplayMain;
    const complete = this.gameplayCompletionist;

    if (main === 0 && complete === 0) {
      return 'Sorry, no time information available';
    } else if (main === 0) {
      return `It will take you up to <strong>${complete}</strong> hours to beat this pile`;
    } else if (complete === 0) {
      return `It will take you up to <strong>${main}</strong> hours to beat this pile`;
    }
    return `It will take you from <strong>${main}</strong> to
      <strong>${complete}</strong> hours to beat this pile`;
  }

  sumMain(): void {
    if (this.entries.length === 0) {
      this.gameplayMain = 0;
    } else {
      this.gameplayMain = this.entries.map((e) => e.gameplayMain).reduce((prev, curr) => prev + curr);
    }
  }

  sumCompletionist(): void {
    if (this.entries.length === 0) {
      this.gameplayCompletionist = 0;
    } else {
      this.gameplayCompletionist = this.entries.map((e) => e.gameplayCompletionist).reduce((prev, curr) => prev + curr);
    }
  }
}

}
