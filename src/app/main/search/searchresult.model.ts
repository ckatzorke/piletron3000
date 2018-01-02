export class SearchResult {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayCompletionist: number,
    public similarity: number
  ) { }
}
