import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@constants/routes';

const routes: Routes = [
  {
    path: AppRoutes.BookList.substring(1),
    loadChildren: () => import('./components/book-list/book-list.module').then(m => m.BookListModule)
  },
  {
    path: AppRoutes.ManageBook.substring(1),
    loadChildren: () => import('./components/manage-book/manage-book.module').then(m => m.ManageBookModule)
  },
  {
    path: AppRoutes.ManageBook.substring(1) + '/:id',
    loadChildren: () => import('./components/manage-book/manage-book.module').then(m => m.ManageBookModule)
  },
  {
    path: '',
    redirectTo: AppRoutes.BookList.substring(1),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: AppRoutes.BookList.substring(1)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
