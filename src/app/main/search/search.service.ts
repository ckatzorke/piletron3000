import { SearchResult } from './searchresult.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  /**
   * Subscribe to this observable to get updates of search results
   */
  updates = new EventEmitter<Array<SearchResult>>();

  results: Array<SearchResult>;

  constructor(private http: HttpClient) { }

  getResults(): Array<SearchResult> {
    return this.results;
  }

  search(searchTerm: string): void {
    this.http.get(`https://ckatzorke.lib.id/hltb/?search=${searchTerm}`).subscribe(data => {
      this.results = data['result'];
      this.updates.emit(this.results);
    }, err => {
      // todo
    });
  }
}
