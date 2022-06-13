import { Injectable, Injector } from '@angular/core';
import { BookService } from './book/book.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private _bookService!: BookService;

  constructor(private injector: Injector) { }

   /**
   * book service
   *
   */
    public get bookService(): BookService {
      if (!this._bookService) {
        this._bookService = this.injector.get(BookService);
      }
      return this._bookService;
    }
}
