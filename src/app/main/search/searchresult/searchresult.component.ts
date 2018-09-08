import { PileEntry } from '../../pile/pile.model';
import { PileService } from '../../pile/pile.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Input } from '@angular/core';
import { IGDBSearchResult } from '../igdbsearch.model';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  @Input() result: IGDBSearchResult;

  buttontext = 'Add to pile';
  disabled = false;

  constructor(private pileService: PileService, @Inject('WINDOW') private window: any) { }

  ngOnInit() {
    /*
    this.pileService.updates.subscribe((id: string) => {
      if (id === this.result.id) {
        this.disable();
      }
    });
    */
  }

  disable() {
    this.buttontext = 'Added';
    this.disabled = true;
  }

  isDisabled() {
    return this.disabled || this.pileService.pileEntries.filter((entry: PileEntry) => entry.igdb_id === this.result.id).length > 0;
  }

  propability() {
    // TODO calculate probability
    // return Math.round(this.result.similarity * 100) + '%';
    return '100%';
  }

  showGameplayTime(): string {
    if (this.result.time_to_beat.completely === 0 && this.result.time_to_beat.hastly === 0) {
      return 'Sorry, no time information available';
    } else if (this.result.time_to_beat.hastly === 0) {
      return `It will take you up to <strong>${this.result.time_to_beat.completely}</strong> hours to beat this game`;
    } else if (this.result.time_to_beat.completely === 0) {
      return `It will take you up to <strong>${this.result.time_to_beat.hastly}</strong> hours to beat this game`;
    }
    return `It will take you from <strong>${this.result.time_to_beat.hastly}</strong> to
      <strong>${this.result.time_to_beat.completely}</strong> hours to beat this game`;
  }

  addToPile(event) {
    this.buttontext = 'Adding...';
    const element = this.window.document.getElementById('pile');
    element.scrollIntoView({ behavior: 'smooth'/*, block: "end", inline: "nearest"*/ });

    this.pileService.add(
      new PileEntry(null, null, this.result.id,
        this.result.url,
        this.result.name,
        this.result.cover.coverUrl,
        this.result.time_to_beat.normally,
        this.result.time_to_beat.completely,
        new Date())).then(() => this.disable());
  }

}
