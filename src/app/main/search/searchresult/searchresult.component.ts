import { PileEntry } from '../../pile/pile.model';
import { PileService } from '../../pile/pile.service';
import { SearchResult } from '../searchresult.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  @Input() result: SearchResult;

  buttontext = 'Add to pile';
  disabled = false;

  constructor(private pileService: PileService, @Inject('WINDOW') private window: any) { }

  ngOnInit() {
    this.pileService.updates.subscribe((id: string) => {
      if (id === this.result.id) {
        this.disable();
      }
    });
  }

  disable() {
    this.buttontext = 'Added';
    this.disabled = true;
  }

  isDisabled() {
    return this.disabled || this.pileService.getEntries().filter((entry: PileEntry) => entry.hltb_id === this.result.id).length > 0;
  }

  propability() {
    return Math.round(this.result.similarity * 100) + '%';
  }

  showGameplayTime(): string {
    if (this.result.gameplayMain === 0 && this.result.gameplayCompletionist === 0) {
      return 'Sorry, no time information available';
    } else if (this.result.gameplayMain === 0) {
      return `It will take you up to <strong>${this.result.gameplayCompletionist}</strong> hours to beat this game`;
    } else if (this.result.gameplayCompletionist === 0) {
      return `It will take you up to <strong>${this.result.gameplayMain}</strong> hours to beat this game`;
    }
    return `It will take you from <strong>${this.result.gameplayMain}</strong> to
      <strong>${this.result.gameplayCompletionist}</strong> hours to beat this game`;
  }

  addToPile(event) {
    this.buttontext = 'Adding...';
    const element = this.window.document.getElementById('pile');
    element.scrollIntoView({ behavior: 'smooth'/*, block: "end", inline: "nearest"*/ });

    this.pileService.add(
      new PileEntry(this.result.id, this.result.name, this.result.imageUrl, this.result.gameplayMain, this.result.gameplayCompletionist));
  }

}
