import { Component, OnInit } from '@angular/core';
import { SearchResult } from './searchresult.model';
import { SearchService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  searchResults: Array<SearchResult>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchResults = this.searchService.getResults();
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm !== '') {
      console.log('search for ', this.searchTerm);
    }
  }

}
