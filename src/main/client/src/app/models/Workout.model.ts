import { Exercise } from "./Exercise.model";

export class Workout {

  public id: string = "";
  public name: string = "";
  public exercises: Exercise[] = [];
  public date: Date = new Date();

  constructor() { }
}
