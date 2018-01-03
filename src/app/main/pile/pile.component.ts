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

}
