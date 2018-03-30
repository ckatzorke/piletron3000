import { Component, OnInit, OnDestroy } from '@angular/core';
import { PileService } from '../main/pile/pile.service';
import { Observable } from 'rxjs/Observable';
import { PileEntry } from '../main/pile/pile.model';
import { Subscription } from 'rxjs/Subscription';
import { AlternativeService, Alternative } from '../shared/alternative.service';

@Component({
  selector: 'app-mypile',
  templateUrl: './mypile.component.html',
  styleUrls: ['./mypile.component.css']
})
export class MyPileComponent implements OnInit, OnDestroy {

  entries: Array<PileEntry>;
  sum: number;
  alternatives: Array<Alternative>;
  pileSubscription: Subscription;

  constructor(private pileService: PileService, private alternativeService: AlternativeService) { }

  ngOnInit() {
    this.update(this.pileService.pileEntries);
    this.pileSubscription = this.pileService.pile.subscribe((e) => {
      this.update(e);
    });
  }

  update(e: Array<PileEntry>) {
    this.entries = e;
    this.sum = this.sumCompletionist();
    this.alternatives = this.alternativeService.findAlternatives(this.sum);
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
    const sum = this.sumCompletionist();
    const days = Math.floor(sum / 24);
    const hours = sum % 25;
    const that_is = days === 0 ? '' : `(that is ${days} days and ${hours} hours) `;
    return `You need to play for ${sum} consecutive hours ${that_is}to finish your pile.`;
  }

  sumCompletionist(): number {
    return this.entries.map((e) => e.gameplayCompletionist).reduce((prev, curr) => prev + curr);
  }
}
