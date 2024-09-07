import { Set } from "./Set.model";

export class Exercise {

  public id: string = "";
  public name: string = "";
  public note: string = "";
  public maxWeight: number = 0.0;
  public sets: Set[] = [];

  public constructor() { }
}
