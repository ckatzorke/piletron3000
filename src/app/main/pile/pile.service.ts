import { PileEntry } from './pile.model';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PileService {

  pileCollection: AngularFirestoreCollection<PileEntry>;
  pileEntries = new Array<PileEntry>();
  pile = new Subject<Array<PileEntry>>();

  constructor(private store: AngularFirestore, private auth: AngularFireAuth) {
    this.pileCollection = this.store.collection<PileEntry>(`users/${this.auth.auth.currentUser.uid}/pile`);
    this.pileCollection.snapshotChanges().subscribe((actions) => {
      console.log('Got actions', actions);
      this.pileEntries = actions.map((action) => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        console.log(`type ${action.type}, id ${id}, data ${data}`);
        this.pileEntries.push(data as PileEntry);
        return data as PileEntry;
      });
      this.pile.next(this.pileEntries);
    })
  }

  add(pileEntry: PileEntry) {
    const docref = this.pileCollection.ref.doc();
    const id = docref.id;
    pileEntry.id = id;
    docref.set({ ...pileEntry }).then(() => console.log('Written')).catch((e) => console.error(e));
  }

  remove(id: string) {
    this.pileCollection.doc(id).delete().then(() => console.log('Deleted')).catch((e) => console.error(e));
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

export interface PileEntryId extends PileEntry { id: string; }
