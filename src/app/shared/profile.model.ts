export class Profile {
  public static readonly GAMERTYPE_MAIN = 0;
  public static readonly GAMERTYPE_MIXED = 1;
  public static readonly GAMERTYPE_COMPLETIONIST = 2;
  userid: string;
  email: string;
  lastSignin: Date;
  signin: Date;
  signout: Date;
  displayName: string;
  gamertype: number;
  constructor() {
    this.gamertype = Profile.GAMERTYPE_MIXED;
  }
}
