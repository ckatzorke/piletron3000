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
    this.http.get(`https://ckatzorke.lib.id/igdb-proxy/?search=${searchTerm}`).subscribe(data => {
      const result = data['result'];
      this.results = new Array<SearchResult>();
      if (result && result.body) {
        const body: Array<any> = result.body;
        body.forEach((entry) => {
          let timeToBeat = new TimeToBeat(entry.time_to_beat);
          let websites = this.parseWebsites(entry.websites);
          let screenshots = this.parseScreenshots(entry.screenshots);
          this.results.push(new SearchResult(entry.id,
            entry.name,
            entry.url,
            entry.cover ? entry.cover.url : 'https://via.placeholder.com/96x96',
            timeToBeat.hastly,
            timeToBeat.normally,
            timeToBeat.completely,
            entry.summary,
            screenshots,
            websites,
            0));
        });
      }
      this.updates.emit(this.results);
    }, err => {
      // todo
    });
  }

  private parseWebsites(websites: Array<any>) {
    let sites = new Array<string>();
    if (websites) {
      websites.forEach(website => {
        websites.push(website.url);
      });
    }
    return sites;
  }

  private parseScreenshots(screenshots: Array<any>) {
    let shots = new Array<string>();
    if (screenshots) {
      screenshots.forEach(shot => {
        screenshots.push(`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${shot.cloudinary_id}.jpg`);
      });
    }
    return shots;
  }
}

class TimeToBeat {
  hastly = 0;
  normally = 0;
  completely = 0;
  constructor(timeToBeat: any) {
    if (timeToBeat) {
      if (timeToBeat.hastly) {
        this.hastly = Math.floor(timeToBeat.hastly / 3600);
      }
      if (timeToBeat.normally) {
        this.normally = Math.floor(timeToBeat.normally / 3600);
      }
      if (timeToBeat.completely) {
        this.completely = Math.floor(timeToBeat.completely / 3600);
      }
    }
    // now check for partial missing info
    if (this.hastly === 0) {
      this.hastly = this.normally === 0 ? this.completely : this.normally;
    }
    if (this.completely === 0) {
      this.completely = this.normally === 0 ? this.hastly : this.normally;
    }
    if (this.normally === 0) {
      this.completely = (this.hastly + this.normally) / 2;
    }
  }
}
