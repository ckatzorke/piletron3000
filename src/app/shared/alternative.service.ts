export class AlternativeService {
  private alternatives: Array<Alternative> = [
    new Alternative(8, 'Watch all Jurassic Park movies',
      'Movie', 'https://www.bingeclock.com/film/marathon/jurassic-park/'),
    new Alternative(14, 'Watch all Nightmare on Elm Street movies',
      'Movie', 'https://www.bingeclock.com/film/marathon/a-nightmare-on-elm-street/t/136445/2546028704/'),
    new Alternative(19, 'Watch all Friday the 13th movies',
      'Movie', 'https://www.bingeclock.com/film/marathon/friday-the-13th/t/136442/3031520891/'),
    new Alternative(20, 'Watch all extended editions of Lord of the Rings and The Hobbit',
      'Movie', 'https://www.bingeclock.com/film/marathon/lord-of-the-rings-trilogy-plus-the-hobbit-trilogy-all-extended-versions/t/136436/1047385467/'),
    new Alternative(36, 'Watch Star Wars 1-8 + Rogue One',
      'Movie', 'https://www.bingeclock.com/film/marathon/star-wars-1/t/130366/3343748271/'),
    new Alternative(36, 'Take the Marvel Cinematic Universe Marathon 2017',
      'Movie', 'https://www.bingeclock.com/film/marathon/marvel-movie-marathon-2017/'),
    new Alternative(53, 'Watch all James Bond movies',
      'Movie', 'https://www.bingeclock.com/film/marathon/james-bond/'),
    new Alternative(22, 'Watch all Harry Potter movies',
      'Movie', 'https://www.bingeclock.com/film/marathon/harry-potter-1/t/136432/9452976245/'),
    new Alternative(79, 'Watch the entire series of Star Trek',
      'Bingewatch', 'https://www.bingeclock.com/s/star-trek/t/130617/4640121424'),
    new Alternative(114, 'Watch the entire series of Spongebob Squarepants',
      'Bingewatch', 'https://www.bingeclock.com/s/spongebob-squarepants/'),
    new Alternative(64, 'Watch the entire series of Breaking Bad',
      'Bingewatch', 'https://www.bingeclock.com/s/breaking-bad/'),
    new Alternative(317, 'Watch the entire series of The Simpsons',
      'Bingewatch', 'https://www.bingeclock.com/s/simpsons/'),
    new Alternative(178, 'Watch the entire series of Star Trek The Next Generation',
      'Bingewatch', 'https://www.bingeclock.com/s/star-trek-the-next-generation/t/130371/8412955533'),
    new Alternative(121, 'Watch the entire series of Lost',
      'Bingewatch', 'https://www.bingeclock.com/s/lost/t/130370/6897466247'),
    new Alternative(144, 'Cross the atlantic with the Titanic', 'Travel', null),
    new Alternative(22, 'Fly from Munich to Sydney', 'Travel', null),
    new Alternative(9, 'Fly from Munich to New York', 'Travel', null),
    new Alternative(1920, 'Travel around the world with Phileas Fogg', 'Travel',
      'https://en.wikipedia.org/wiki/Around_the_World_in_Eighty_Days'),
    new Alternative(384, 'Visit Oktoberfest', 'Travel', 'https://www.oktoberfest.de/en/'),
    new Alternative(16, 'Listen to "Der Ring der Nibelungen"', 'Music',
      'https://www.planet-wissen.de/geschichte/persoenlichkeiten/richard_wagner/pwiederringdesnibelungenwagnershauptwerk100.html'),
    new Alternative(1, 'Listen to "Carmina Burana"', 'Travel',
      'https://www.quora.com/How-long-does-an-average-performance-of-Carmina-Burana-last'),
    new Alternative(18960, 'Construct the Titanic', 'Construction', 'http://www.titanicfacts.net/building-the-titanic.html'),
    new Alternative(26280, 'Construct Death Star II', 'Construction', 'http://starwars.wikia.com/wiki/Death_Star_II'),
    new Alternative(24, 'Read Ulysses', 'Books', 'https://en.wikipedia.org/wiki/Ulysses_(novel)'),
    new Alternative(120, 'Travel to Moon', 'Travel', 'https://www.universetoday.com/13562/how-long-does-it-take-to-get-to-the-moon/'),
    new Alternative(3672, 'Travel to Venus', 'Travel',
      'https://www.universetoday.com/36288/how-long-does-it-take-to-get-to-venus/'),
    new Alternative(5040, 'Travel to Mars', 'Travel',
      'https://www.mars-one.com/faq/mission-to-mars/how-long-does-it-take-to-travel-to-mars')
  ];
  constructor() {
  }

  findAlternatives(pileSizeInHours): Array<Alternative> {
    // full work weeks (40 hrs)
    // walk 5 km/h
    const retval = new Array<Alternative>();
    const work = this.shuffle(this.alternatives);
    let fillValue = 0;
    work.forEach(alternative => {
      if (alternative.hours + fillValue < pileSizeInHours) {
        retval.push(alternative);
        fillValue += alternative.hours;
      }
    });
    // fill remaining gap with "go for a walk (5 km/h)"
    retval.push(new Alternative(pileSizeInHours - fillValue,
      `Walk for ${(pileSizeInHours - fillValue) * 5} kilometers`, 'Remaining', null));
    return retval;
  }

  private shuffle(a: Array<Alternative>): Array<Alternative> {
    // do not shuffle original array
    const ret = a;
    for (let i = ret.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret;
  }
}

export class Alternative {
  constructor(public readonly hours: number, public readonly description: string, public readonly category: string, public readonly url) {
  }
}
