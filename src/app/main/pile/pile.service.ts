import { PileEntry } from './pile.model';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from 'firebase/app';

@Injectable()
export class PileService {

  private emitter: EventEmitter<Array<PileEntry>>;
  pileCollection: AngularFirestoreCollection<PileEntry>;
  pileEntries = new Array<PileEntry>();
  pile: Observable<Array<PileEntry>> = Observable.create(e => this.emitter = e);

  constructor(private store: AngularFirestore, private auth: AngularFireAuth) {
    auth.authState.subscribe((user: User) => {
      if (user) {
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
          this.emitter.next(this.pileEntries);
        });
      }
    });

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


}
