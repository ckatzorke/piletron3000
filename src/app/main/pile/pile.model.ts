export class PileEntry {
  constructor(
    public id: string,
    public igdb_id: string,
    public name: string,
    public igdb_url,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayMixed: number,
    public gameplayCompletionist: number,
    public added: Date
  ) {
  }
}
