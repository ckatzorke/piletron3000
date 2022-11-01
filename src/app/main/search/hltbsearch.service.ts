import { HLTBSearchResult } from './hltbsearchresult.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class HLTBSearchService {

  /**
   * Subscribe to this observable to get updates of search results
   */
  updates = new EventEmitter<Array<HLTBSearchResult>>();

  results: Array<HLTBSearchResult>;

  constructor(private http: HttpClient) { }

  getResults(): Array<HLTBSearchResult> {
    return this.results;
  }

  search(searchTerm: string): void {
    this.http.get(`https://libratron3000.katzorke.io/.netlify/functions/hltb?search=${searchTerm}`).subscribe(data => {
      this.results = data['result'];
      this.updates.emit(this.results);
    }, err => {
      // todo
    });
  }
}
