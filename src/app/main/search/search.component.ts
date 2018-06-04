import { Component, OnInit } from '@angular/core';
import { HLTBSearchResult } from './hltbsearchresult.model';
import { HLTBSearchService } from './hltbsearch.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  searching = false;
  searchResults: Array<HLTBSearchResult> = new Array<HLTBSearchResult>();

  constructor(private searchService: HLTBSearchService) { }

  ngOnInit() {
    this.searchService.updates.subscribe((updatedResults) => {
      this.searchResults = updatedResults;
      this.searching = false;
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm !== '') {
      this.searching = true;
      this.searchService.search(this.searchTerm);
    }
  }

  onResetSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }

}
