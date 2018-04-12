export class SearchResult {
  constructor(
    public id: string,
    public name: string,
    public url: string,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayMixed: number,
    public gameplayCompletionist: number,
    public summary: string,
    public screenshots: Array<String>,
    public websites: Array<String>,
    public similarity: number
  ) { }
}
