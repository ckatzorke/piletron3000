import { Component, OnInit } from '@angular/core';
import { HLTBSearchResult } from './hltbsearchresult.model';
import { HLTBSearchService } from './hltbsearch.service';
import IGDBSearchService from './igdbsearch.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  searching = false;
  searchResults: Array<HLTBSearchResult> = new Array<HLTBSearchResult>();

  constructor(private igdbSearchService: IGDBSearchService, private hltbSearchService: HLTBSearchService) { }

  ngOnInit() {
    this.hltbSearchService.updates.subscribe((updatedResults) => {
      this.searchResults = updatedResults;
      this.searching = false;
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm !== '') {
      this.searching = true;
      this.hltbSearchService.search(this.searchTerm);
    }
  }

  onResetSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }

}
