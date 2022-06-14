import { Injectable, Injector } from '@angular/core';
import { BookListService } from './book/book-list.service';
import { BookService } from './book/book.service';
import { DialogService } from './dialog/dialog.service';
import { SnackbarService } from './snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private _bookService!: BookService;
  private _bookListService!: BookListService;
  private _snackBarService!: SnackbarService;
  private _dialogService!: DialogService;

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


     /**
   * book list service
   *
   */
      public get bookListService(): BookListService {
        if (!this._bookListService) {
          this._bookListService = this.injector.get(BookListService);
        }
        return this._bookListService;
      }


        /**
   * snackbar service
   *
   *
   */
  public get snackbarService(): SnackbarService {
    if (!this._snackBarService) {
      this._snackBarService = this.injector.get(SnackbarService);
    }
    return this._snackBarService;
  }

  /**
   * dialog service
   *
   *
   */
  public get dialogService(): DialogService {
    if (!this._dialogService) {
      this._dialogService = this.injector.get(DialogService);
    }
    return this._dialogService;
  }
}
