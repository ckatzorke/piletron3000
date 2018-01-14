import { PileEntry } from './pile.model';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class PileService {

  entries: Array<PileEntry> = new Array<PileEntry>();
  updates = new EventEmitter<string>();

  pileCollection: AngularFirestoreCollection<PileEntry>;
  collectionEntries: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.pileCollection = this.firestore.collection('users').doc('ckatzorke@gmail.com').collection('pile');
    this.collectionEntries = this.firestore.collection('users').doc('ckatzorke@gmail.com').collection('pile').valueChanges();
    this.collectionEntries.subscribe((e) => {
      this.entries = e;
      console.log(e);
      this.updates.emit('0');
    });
  }

  add(pileEntry: PileEntry) {
    this.pileCollection.add({ ...pileEntry });
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
