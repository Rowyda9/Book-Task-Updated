import { Component, OnInit } from '@angular/core';
import { Book } from '@models/book/book.model';
import { FacadeService } from '@services/facade.service';
import { AppRoutes } from '@constants/routes';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { Assets } from '@constants/assets';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@constants/local-storage';

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
  listName:string =LocalStorage.DefaultList;
  get routes(): typeof AppRoutes {
    return AppRoutes;
  }
  imgUrl:string = Assets.Empty;
  constructor(private facadeService: FacadeService,private activatedRoute: ActivatedRoute) {
      this.listName = this.activatedRoute.snapshot.paramMap.get('name') ??  LocalStorage.DefaultList;
    }

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
      this.books = this.facadeService.bookService.list(this.listName);
    }

  /**
   * set default list of books
   *
   */
    seedBookData() {
       this.facadeService.bookListService.addDefaultList();
       this.getBooks();
       this.facadeService.snackbarService.success("Book list has been updated successfully");
    }


  /**
   * delete book from list
   *
   * @param book
   */
    async deleteBook(book: Book): Promise<void> {
    if (await this.facadeService.dialogService.openDialog(book?.title)) {
    const isDeleted = this.facadeService.bookService.delete(this.listName,book.id);
    if (isDeleted) {
      this.books = this.facadeService.bookService.list(this.listName,);
      this.facadeService.snackbarService.secondary("Book has been deleted successfully");
    }
  }
  }

  /**
   * delete book list
   *
   */
  async clearList(): Promise<void> {
    if (await this.facadeService.dialogService.openDialog(this.listName+" List")) {
    const isDeleted = this.facadeService.bookListService.deleteList(this.listName,);
    if (isDeleted) {
      this.books = [];
      this.facadeService.snackbarService.secondary("Books List has been deleted successfully");
    }
  }
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
    this.books = this.facadeService.bookService.changeOrder(this.listName,bookToChangeOrder, bookOfCurrentOrder);
  }

}
