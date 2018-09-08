import { Component, OnInit } from '@angular/core';
import { HLTBSearchResult } from './hltbsearchresult.model';
import { HLTBSearchService } from './hltbsearch.service';
import IGDBSearchService from './igdbsearch.service';
import { IGDBSearchResult } from './igdbsearch.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  searching = false;
  // searchResults: Array<HLTBSearchResult> = new Array<HLTBSearchResult>();
  searchResults: Array<IGDBSearchResult> = new Array<IGDBSearchResult>();

  constructor(private igdbSearchService: IGDBSearchService/*, private hltbSearchService: HLTBSearchService*/) { }

  ngOnInit() {
    /*this.hltbSearchService.updates.subscribe((updatedResults) => {
      this.searchResults = updatedResults;
      this.searching = false;
    });*/
    this.igdbSearchService.updates.subscribe((updatedResults) => {
      console.log('IGDBResults:', updatedResults);
      const release = new Date(updatedResults[0].first_release_date * 1000);
      console.log(release)  ;
      this.searchResults = updatedResults;
      this.searching = false;
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm !== '') {
      this.searching = true;
      // this.hltbSearchService.search(this.searchTerm);
      this.igdbSearchService.search(this.searchTerm);
    }
  }

  onResetSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }

}
