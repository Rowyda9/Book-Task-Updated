export class PagedResults<T> {
  constructor(
    public totalCount: number = 0,
    public results: T[] = [],
  ) {}
}
