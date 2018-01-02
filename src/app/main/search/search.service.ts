import { SearchResult } from './searchresult.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

export class SearchService {

  /**
   * Subscribe to this observable to get updates of search results
   */
  updates = new EventEmitter<Array<SearchResult>>();

  results = [
    new SearchResult('2302', 'Dead Island', 'https://howlongtobeat.com/gameimages/Dead_island_PC_packshot.png', 18, 46, 1),
    new SearchResult('2306', 'Dead Island: Riptide', 'https://howlongtobeat.com/gameimages/DeadIslandRiptide.jpg', 11.5, 36.5, 0.55)];

  constructor(private http: HttpClient) { }

  getResults(): Array<SearchResult> {
    return this.results;
  }

  search(searchTerm: string): void {
    this.http.get(`https://ckatzorke.lib.id/hltb/?search=${searchTerm}`).subscribe(data => {
      console.log('got data', data);
      this.results = data['result'];
      console.log('updated results', this.results);
      this.updates.emit(this.results);
    });
  }
}
