export class PileEntry {
  constructor(
    public hltb_id: string,
    public name: string,
    public imageUrl: string,
    public gameplayMain: number,
    public gameplayCompletionist: number
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
