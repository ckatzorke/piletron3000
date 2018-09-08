import { Injectable, EventEmitter } from '@angular/core';
import { IGDBSearchResult, IGDBTimeToBeat, IGDBGenre, IGDBPlatform, IGDBImage} from './igdbsearch.model';
import { IGDBVideo, IGDBWebsite, IGDBCover, IGDBPlaceholderCover } from './igdbsearch.model';
import { HttpClient } from '@angular/common/http';
import { parse } from 'url';

@Injectable()
export default class IGDBSearchService {

  updates = new EventEmitter<Array<IGDBSearchResult>>();

  results: Array<IGDBSearchResult>;

  constructor(private http: HttpClient) { }

  getResults(): Array<IGDBSearchResult> {
    return this.results;
  }

  search(searchTerm: string): void {
    this.http.get(`https://ckatzorke.lib.id/igdb-proxy@dev/?search=${searchTerm}`).subscribe(data => {
      const searchResult: any[] = data['result'].body;
      const igdbResults = new Array<IGDBSearchResult>();
      searchResult.forEach(r => {
        const item = new IGDBSearchResult(
          r.id, r.name, r.slug, r.url, r.created_at, r.updated_at, r.summary,
          this.parseTimeToBeat(r.time_to_beat), this.parseGenres(r.genres), r.first_release_date,
          this.parsePlatforms(r.platforms), null, this.parseCover(r.cover), this.parseImages(r.screenshots),
          this.parseVideos(r.videos), this.parseWebsites(r.websites));
        igdbResults.push(item);
      });
      this.results = igdbResults;
      this.updates.emit(this.results);
    }, err => {
      // todo
    });
  }

  private parseTimeToBeat(timeToBeat: any): IGDBTimeToBeat {
    let hastly = 0, normally = 0, completely = 0;
    if (timeToBeat) {
      if (timeToBeat.hastly) {
        hastly = Math.floor(timeToBeat.hastly / 3600);
      }
      if (timeToBeat.normally) {
        normally = Math.floor(timeToBeat.normally / 3600);
      }
      if (timeToBeat.completely) {
        completely = Math.floor(timeToBeat.completely / 3600);
      }
    }
    // now check for partial missing info
    if (hastly === 0) {
      hastly = normally === 0 ? completely : normally;
    }
    if (completely === 0) {
      completely = normally === 0 ? hastly : normally;
    }
    if (normally === 0) {
      completely = (hastly + normally) / 2;
    }
    return new IGDBTimeToBeat(hastly, normally, completely);
  }

  private parseGenres(genres: any[]): IGDBGenre[] {
    const parsedGenres = new Array<IGDBGenre>();
    if (genres) {
      genres.forEach(genre => {
        parsedGenres.push(new IGDBGenre(genre.id, genre.name, genre.slug, genre.url, genre.created_at, genre.updated_at));
      });
    }
    return parsedGenres;
  }

  private parsePlatforms(platforms: any[]): IGDBPlatform[] {
    const parsedPlatforms = new Array<IGDBPlatform>();
    if (platforms) {
      platforms.forEach(platform => {
        parsedPlatforms.push(
          new IGDBPlatform(
            platform.id, platform.name, platform.slug, platform.url,
            this.parseImage(platform.logo), platform.created_at, platform.updated_at
          )
        );
      });
    }
    return parsedPlatforms;
  }

  private parseImage(image: any): IGDBImage {
    if (image) {
      return new IGDBImage(image.url, image.cloudinary_id, image.width, image.height);
    }
    return null;
  }
  private parseCover(image: any): IGDBCover {
    if (image) {
      return new IGDBCover(image.url, image.cloudinary_id, image.width, image.height);
    } else {
      return new IGDBPlaceholderCover();
    }
  }

  private parseImages(images: any[]): IGDBImage[] {
    const parsedImages = new Array<IGDBImage>();
    if (images) {
      images.forEach(image => {
        parsedImages.push(
          this.parseImage(image)
        );
      });
    }
    return parsedImages;
  }

  private parseVideos(videos: any[]): IGDBVideo[] {
    const parsedVideos = new Array<IGDBVideo>();
    if (videos) {
      videos.forEach(video => {
        parsedVideos.push(
          new IGDBVideo(video.name, video.video_id)
        );
      });
    }
    return parsedVideos;
  }

  private parseWebsites(websites: any[]): IGDBWebsite[] {
    const parsedWebsites = new Array<IGDBWebsite>();
    if (websites) {
      websites.forEach(site => {
        parsedWebsites.push(
          new IGDBWebsite(site.category, site.url)
        );
      });
    }
    return parsedWebsites;
  }
}
