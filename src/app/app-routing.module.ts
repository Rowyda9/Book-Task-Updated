import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@constants/routes';

const routes: Routes = [
  {
    path:AppRoutes.MyBookList.substring(1),
    loadChildren: () => import('./components/my-list/my-list.module').then(m => m.MyListModule)
  },
  {
    path: AppRoutes.BookList.substring(1),
    loadChildren: () => import('./components/book-list/book-list.module').then(m => m.BookListModule)
  },
  {
    path: AppRoutes.BookList.substring(1)+ '/:name',
    loadChildren: () => import('./components/book-list/book-list.module').then(m => m.BookListModule)
  },
  {
    path: AppRoutes.ManageBook.substring(1)+ '/:name',
    loadChildren: () => import('./components/manage-book/manage-book.module').then(m => m.ManageBookModule)
  },
  {
    path: AppRoutes.ManageBook.substring(1) + '/:name'+ '/:id',
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
