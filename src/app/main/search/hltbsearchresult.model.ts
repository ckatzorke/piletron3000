export class HLTBSearchResult {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayCompletionist: number,
    public similarity: number
  ) { }
}
