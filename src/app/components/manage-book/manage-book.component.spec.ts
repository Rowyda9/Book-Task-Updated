import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageBookComponent } from './manage-book.component';
import { Book } from '../../core/models/book/book.model';
import { AppRoutes } from '@constants/routes';
import { BookListComponent } from '@components/book-list/book-list.component';

describe('ManageBookComponent', () => {
  let component: ManageBookComponent;
  let fixture: ComponentFixture<ManageBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      //  RouterTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'book-list', component: BookListComponent}]
        ),
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatCardModule,
        FormsModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDividerModule,
        ReactiveFormsModule

      ],
      declarations: [ ManageBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.bookForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let errors:any = {};
    let field = component.bookForm.controls['title'];
    errors = field.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('author field validity', () => {
    let errors:any = {};
    let field = component.bookForm.controls['authorName'];
    errors = field.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('publish year field validity', () => {
    let errors:any = {};
    let field = component.bookForm.controls['publishYear'];
    errors = field.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a form emits a book', async () => {
    expect(component.bookForm.valid).toBeFalsy();
    component.bookForm.controls['title'].setValue("Test Book");
    component.bookForm.controls['authorName'].setValue("Author Test");
    component.bookForm.controls['publishYear'].setValue(2000);
    expect(component.bookForm.valid).toBeTruthy();

     var book!: Book;
     component.testBook.subscribe(
      (value) => book = value
      );
    component.onSubmit();
    expect(book.title).toBe("Test Book");
    expect(book.authorName).toBe("Author Test");
  });

});


