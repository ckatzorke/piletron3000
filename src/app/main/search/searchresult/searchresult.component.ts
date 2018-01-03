import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../searchresult.model';
import { Input } from '@angular/core';
import { PileService } from '../../pile/pile.service';
import { PileEntry } from '../../pile/pile.model';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  @Input() result: SearchResult;

  constructor(private pileService: PileService) { }

  ngOnInit() {
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

  addToPile() {
    this.pileService.add(
      new PileEntry(this.result.id, this.result.name, this.result.imageUrl, this.result.gameplayMain, this.result.gameplayCompletionist));
  }

}
