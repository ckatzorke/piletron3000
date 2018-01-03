import { Component, OnInit } from '@angular/core';
import { PileService } from './pile.service';
import { PileEntry } from './pile.model';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css']
})
export class PileComponent implements OnInit {

  entries: Array<PileEntry> = new Array<PileEntry>();

  constructor(private pileService: PileService) { }

  ngOnInit() {
    this.pileService.updates.subscribe(() => {
      this.entries = this.pileService.getEntries();
    });
  }

  showGameplayTime() {
    const main = this.sumMain();
    const complete = this.sumCompletionist();

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

  sumMain(): number {
    return this.entries
      .map((e) => e.gameplayMain)
      .reduce((prev, curr) => prev + curr);
  }

  sumCompletionist(): number {
    return this.entries
      .map((e) => e.gameplayCompletionist)
      .reduce((prev, curr) => prev + curr);
  }

}
