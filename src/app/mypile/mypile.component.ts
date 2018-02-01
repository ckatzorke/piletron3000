import { Component, OnInit, OnDestroy } from '@angular/core';
import { PileService } from '../main/pile/pile.service';
import { Subscription } from 'rxjs/Subscription';
import { PileEntry } from '../main/pile/pile.model';

@Component({
  selector: 'app-mypile',
  templateUrl: './mypile.component.html',
  styleUrls: ['./mypile.component.css']
})
export class MyPileComponent implements OnInit, OnDestroy {

  entries: PileEntry[] = new Array<PileEntry>();
  subscription: Subscription;

  constructor(private pileService: PileService) { }

  ngOnInit() {
    this.subscription = this.pileService.updates.subscribe(() => {
      this.entries = this.pileService.getEntries();
    });
    this.entries = this.pileService.getEntries();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
