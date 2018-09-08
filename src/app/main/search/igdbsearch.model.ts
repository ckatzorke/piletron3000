export class IGDBSearchResult {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public url: string,
    public created_at: Date,
    public updated_at: Date,
    public summary: string,
    public time_to_beat: IGDBTimeToBeat,
    public genre: IGDBGenre[],
    public first_release_date: Date,
    public platform: IGDBPlatform[],
    public release_dates: IGDBReleaseDate[],
    public cover: IGDBCover,
    public screenshots: IGDBImage[],
    public videos: IGDBVideo[],
    public websites: IGDBWebsite[]
  ) { }
}

export class IGDBTimeToBeat {
  constructor(
    public hastly: number,
    public normally: number,
    public completely: number
  ) { }
}

export class IGDBGenre {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public url: string,
    public created_at: Date,
    public updated_at: Date,
  ) { }
}

export class IGDBPlatform {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public url: string,
    public logo: IGDBImage,
    public created_at: Date,
    public updated_at: Date,
  ) { }
}

export class IGDBReleaseDate {


}

export class IGDBImage {
  CLOUDINARY_BASE_URL = 'https://images.igdb.com/igdb/image/upload';
  public readonly thumbUrl = `${this.CLOUDINARY_BASE_URL}/t_thumb/${this.cloudinary_id}.jpg`;;
  public readonly originalUrl = `${this.CLOUDINARY_BASE_URL}/t_original/${this.cloudinary_id}.jpg`;
  constructor(
    public url: string,
    public cloudinary_id: string,
    public width: number,
    public height: number
  ) { }

}

export class IGDBCover extends IGDBImage {
  public readonly coverUrl = `${this.CLOUDINARY_BASE_URL}/t_cover_small/${this.cloudinary_id}.jpg`;
}

export class IGDBPlaceholderCover extends IGDBCover {
  public readonly coverUrl = 'https://via.placeholder.com/90x116';
  constructor() {
    super(null, null, null, null);
   }
}

export class IGDBVideo {
  public readonly youtubeUrl = `https://www.youtube.com/watch?v=${this.video_id}`;
  constructor(
    public name: string,
    public video_id: string
  ) { }

}

export class IGDBWebsite {
  constructor(
    public category: string,
    public url: string
  ) { }
}
