import { PileEntry } from './pile.model';
import { EventEmitter } from '@angular/core';
export class PileService {

  constructor() {
  }

  entries: Array<PileEntry> = new Array<PileEntry>();

  updates = new EventEmitter<string>();

  add(pileEntry: PileEntry) {
    this.entries.push(pileEntry);
    this.updates.emit(pileEntry.hltb_id);
  }

  getEntries(): Array<PileEntry> {
    return this.entries;
  }

  // full work weeks (40 hrs)
  // bingewatching
  //  lotr
  //  Star Wars
  //  serien...
  // travel to
  //  mars, ...
  // drive from-to
  // soccer games
  // level up in d&d
  // build death star 1 (20yrs), 2 (3 yrs)
  // build titanic (2yrs 2months)
  // listen to carmina burana (63 minutes)
  // ring der nibelungen (16 hrs)
  // Oktoberfest (16 Tage)
  // 80 days around the world phileas fogg
  // fly from germany to new york (9 hrs)
  // titanic cross atlantic (6 days)


}
