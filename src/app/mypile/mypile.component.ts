import { Component, OnInit, OnDestroy } from '@angular/core';
import { PileService } from '../main/pile/pile.service';
import { Observable } from 'rxjs/Observable';
import { PileEntry } from '../main/pile/pile.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-mypile',
  templateUrl: './mypile.component.html',
  styleUrls: ['./mypile.component.css']
})
export class MyPileComponent implements OnInit, OnDestroy {

  entries: Array<PileEntry>;
  pileSubscription: Subscription;

  constructor(private pileService: PileService) { }

  ngOnInit() {
    this.entries = this.pileService.pileEntries;
    this.pileSubscription = this.pileService.pile.subscribe((e) => {
      this.entries = e;
    });
  }

  ngOnDestroy() {
    this.pileSubscription.unsubscribe();
  }

  onRemove(id) {
    this.pileService.remove(id);
  }


}
