import { Component, OnInit } from '@angular/core';
import { Book } from '@models/book/book.model';
import { FacadeService } from '@services/facade.service';
import { AppRoutes } from '@constants/routes';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { ConfirmDialogComponent } from 'src/app/core/shared/confirm-dialog/confirm-dialog.component';
import { Assets } from '@constants/assets';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})

export class BookListComponent implements OnInit {
  books:Book[] = [];
  get routes(): typeof AppRoutes {
    return AppRoutes;
  }
  imgUrl:string = Assets.Empty;
  constructor(private facadeService: FacadeService,
    public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.getBooks();
      console.clear();
    }

    trackBy(index: number, item: Book) {
      return item.id;
    }

  /**
   * get list of books
   *
   */
    getBooks() {
      this.books = this.facadeService.bookService.list();
    }

  /**
   * set default list of books
   *
   */
    seedBookData() {
       this.facadeService.bookService.addList();
       this.getBooks();
       this._snackBar.open("Book list has been updated successfully", "OK",{
        duration: 2000
       });
    }


  /**
   * delete book from list
   *
   * @param book
   */
    async deleteBook(book: Book): Promise<void> {
    if (await this.openDialog(book?.title)) {
    const isDeleted = this.facadeService.bookService.delete(book.id);
    if (isDeleted) {
      this.books = this.facadeService.bookService.list();
      this._snackBar.open("Book has been deleted successfully", "OK");
    }
  }
  }

  /**
   * delete book list
   *
   */
  async clearList(): Promise<void> {
    if (await this.openDialog("Book List")) {
    const isDeleted = this.facadeService.bookService.deleteAll();
    if (isDeleted) {
      this.books = [];
      this._snackBar.open("Books List has been deleted successfully", "OK");
    }
  }
  }

  /**
   * open confirm dialog
   *
   * @param bookTitle
   */
  async openDialog(bookTitle: string): Promise<boolean> {
    return await firstValueFrom(this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: bookTitle,
      }).afterClosed());

    }


  /**
   * drag/drop book from list
   *
   * @param event
   */
  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    this.changeOrder(this.books[event.previousIndex], this.books[event.currentIndex]);
  }

   /**
   * change book ordr list
   *
   * @param book
   * @param order
   */
  changeOrder(bookToChangeOrder: Book, bookOfCurrentOrder: Book) {
    this.books = this.facadeService.bookService.changeOrder(bookToChangeOrder, bookOfCurrentOrder);
  }

}
