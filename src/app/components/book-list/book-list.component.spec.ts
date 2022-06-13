import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '@services/book/book.service';
import { ConfirmDialogModule } from '@shared/confirm-dialog/confirm-dialog.module';
import { BookListComponent } from './book-list.component';
import {defaultBooks} from './../../core/constants/book-list';
import { of } from 'rxjs';
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockService:any;
  let list = defaultBooks;

  beforeEach(async () => {
   mockService = jasmine.createSpyObj(BookService,['listAll']);
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ],
      imports: [

  RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatInputModule,
        MatIconModule,
        DragDropModule,
        MatToolbarModule,
        MatDialogModule,
        ConfirmDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatDividerModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('get books correctly from the service', () => {
  //   expect(component.getBooks).toBeTruthy();
  //   mockService.listAll.and.returnValue(of(list));
  //      fixture.detectChanges();
  //      expect(component.getBooks).toBe(4);
  // });
});
