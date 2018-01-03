import { PileEntry } from './pile.model';
import { EventEmitter } from '@angular/core';
export class PileService {

  entries: Array<PileEntry> = new Array<PileEntry>();

  updates = new EventEmitter<void>();

  add(pileEntry: PileEntry) {
    this.entries.push(pileEntry);
    this.updates.emit();
  }

  getEntries(): Array<PileEntry> {
    return this.entries;
  }

}
