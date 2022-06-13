import { Base } from "../base.model";

export class Book extends Base {
  constructor(
    public order: number=0,
    public title: string = null!,
    public authorName: string = null!,
    public publishYear: number = null!,
    public poster:string = null!

  ) {
    super();
  }
}
