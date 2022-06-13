export class Pagination {
  constructor(
    public queryString: string = null!,
    public pageNumber: number = 0,
    public pageSize: number = 10,
  ) {}
}
