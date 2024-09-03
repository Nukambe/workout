import { Set } from "./Set.model";

export class Exercise {

  public id: string = "UUID";
  public name: string = "new exercise";
  public note: string = "";
  public maxWeight: number = 0.0;
  public sets: Set[] = [];

  public constructor() { }
}
