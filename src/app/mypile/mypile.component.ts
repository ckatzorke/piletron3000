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

  getSummary() {
    const sum = this.sumCompletionist();
    const days = Math.floor(sum / 24);
    const hours = sum % 25;
    const that_is = days === 0 ? '' : `(that is ${days} days and ${hours} hours) `;
    return `You need to play for ${sum} consecutive hours ${that_is}to finish your pile.`;
  }

  sumCompletionist(): number {
    return this.entries.map((e) => e.gameplayCompletionist).reduce((prev, curr) => prev + curr);
  }

  // full work weeks (40 hrs)
  // bingewatching (https://www.bingeclock.com)
  //  lotr + hobbits extended 20 hours https://www.bingeclock.com/film/marathon/star-wars-1/t/130366/3343748271/
  //  Star Wars 1-3 Rogue one 4 - 8  20 hours https://www.bingeclock.com/film/marathon/star-wars-1/t/130366/3343748271/
  // MARVEL MOVIE MARATHON 2017 36 hours https://www.bingeclock.com/film/marathon/marvel-movie-marathon-2017/
  // James Bond 53 hours https://www.bingeclock.com/film/marathon/james-bond/
  //  serien...
  // Lost 121 hours https://www.bingeclock.com/s/lost/t/130370/6897466247
  // Star Trek TNG 178  https://www.bingeclock.com/s/star-trek-the-next-generation/t/130371/8412955533
  // Simpsons 317 hrs https://www.bingeclock.com/s/simpsons/
  // Breaking Bad 62 hrs https://www.bingeclock.com/s/breaking-bad/
  // Spongebob Squarepants 114h https://www.bingeclock.com/s/spongebob-squarepants/
  // Star Trek 79 hrs https://www.bingeclock.com/s/star-trek/t/130617/4640121424
  // Harry Potter 22 hours
  // travel to
  //  mars 7months 5040 hrs https://www.mars-one.com/faq/mission-to-mars/how-long-does-it-take-to-travel-to-mars
  //  Venus 153 days 3672 hours https://www.universetoday.com/36288/how-long-does-it-take-to-get-to-venus/
  //  moon 120 hrs https://www.universetoday.com/13562/how-long-does-it-take-to-get-to-the-moon/
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
  getAlternative() {
    const count = 4;
    return `work ${count} regular work weeks - 40 hours each`;
  }


}
