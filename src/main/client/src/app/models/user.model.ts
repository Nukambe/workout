import {Workout} from "./Workout.model";

export class User {

  public id: string = "";
  public name: string = "";
  public email: string = "";
  public emailVerified: boolean = false;
  public avatarUrl: string = "https://gym.chappelly.com/default-avatar.png";
  public lastLogin: Date = new Date();
  public workouts: Workout[] = [];
  public password: string = "";
  public confirmPassword: string = "";

  constructor() {}
}
