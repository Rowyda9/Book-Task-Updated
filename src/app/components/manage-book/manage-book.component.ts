import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@models/book/book.model';
import { FacadeService } from '@services/facade.service';
import { AppRoutes } from '@constants/routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@constants/local-storage';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})

export class ManageBookComponent implements OnInit {
  @Output() testBook: EventEmitter<Book> = new EventEmitter<Book>();
  listName:string =LocalStorage.DefaultList;
  bookId = 0;
  book = new Book();
  get isEdit(): boolean {
    return this.bookId > 0;
  }
  get routes(): typeof AppRoutes {
    return AppRoutes;
  }
  currentYear : number=new Date().getFullYear();
  bookForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    authorName: new FormControl('',Validators.required),
    publishYear: new FormControl('',[Validators.required]),
    poster: new FormControl(''),
  });

  constructor(
    private facadeService: FacadeService,private activatedRoute: ActivatedRoute,
    private router: Router ) {
    this.bookId = +(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    this.listName = this.activatedRoute.snapshot.paramMap.get('name') ??  LocalStorage.DefaultList;
   }

  ngOnInit(): void {
    console.clear();
    if (this.isEdit)
       this.getBook();
  }

  /**
   * get book by id
   *
   */
  getBook() {
    this.book = this.facadeService.bookService.get(this.listName,this.bookId);
    this.bookForm.patchValue(this.book);
  }

   /**
   * get validation error message
   *
   * @param controlName
   */
   validateControlName(name:string) {
    const formControl = this.bookForm.get(name);
    if(formControl?.errors?.['required'])
              return 'This field is required';

    if(formControl?.errors?.['minlength'])
               return name + 'must be at least 4 characters long.';

    if(formControl?.errors?.['maxLength'])
    return name + 'must be 4 characters long.';

    return null;
  }


/**
 * Save book
 *
 */
  onSubmit() {
    if (this.bookForm.invalid) return;
    this.book = this.bookForm.value;
    this.testBook.emit(
      new Book(1,
          this.bookForm.value.title,
          this.bookForm.value.authorName,
         this.bookForm.value.publishYear
      )
  );

    if (this.isEdit) {
      this.book.id = this.bookId;
      this.facadeService.bookService.update(this.listName,this.book);
    } else {
      this.facadeService.bookService.create(this.listName,this.book);
    }
    this.facadeService.snackbarService.success("Book has been saved successfully");
    this.router.navigateByUrl(AppRoutes.BookList+"/"+this.listName);
  }


}
