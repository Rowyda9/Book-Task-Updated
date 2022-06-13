 /**
  *
  * @class Base
  */

  export class Base {
    constructor(
      public id: number = 0,
      public createdBy: string = null!,
      public updatedBy: string = null!,
      public deletedBy: string = null!,
      public isDeleted: boolean = false,
      public createdDate: Date = new Date(),
      public updatedDate: Date =  new Date(),
      public deletedDate: Date  = new Date(),
    ) {}
  }
