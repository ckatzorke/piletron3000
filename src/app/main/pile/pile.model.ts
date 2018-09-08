export class PileEntry {
  constructor(
    public id: string,
    public hltb_id: string,
    public igdb_id: number,
    public igdb_url: string,
    public name: string,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayCompletionist: number,
    public added: Date
  ) {
    if (gameplayMain === 0 && gameplayCompletionist !== 0) {
      console.log('No main play time, setting to ' + gameplayCompletionist);
      this.gameplayMain = gameplayCompletionist;
    }
    if (gameplayMain !== 0 && gameplayCompletionist === 0) {
      console.log('No completionist play time, setting to ' + gameplayMain);
      this.gameplayCompletionist = gameplayMain;
    }
  }
}
