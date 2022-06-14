import { Injectable } from '@angular/core';
import { LocalStorage } from '@constants/local-storage';
import { Book } from '@models/book/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService  {
  protected localStorageKey = LocalStorage.DefaultList;
 /**
   * get ts details
   *
   *
   * @param id
   */
  get(listName:string,id: number): Book {
    return this.list(listName).find(t => t.id === id)!;
  }

  /**
   * list all Books
   *
   *
   */
    list(name:string): Book[] {
      if(localStorage.getItem(name)){
        return ((JSON.parse(localStorage.getItem(name) ?? '[]')) as Book[])
        .sort((a, b) => a.order - b.order);
      }
      return [];

  }

    /**
   * create new item
   *
   *
   * @param body
   */
    create(listName:string,body: Book): any {
      const list = this.list(listName);
      body.id = list.length + 1;
      body.order = list.length + 1;
      list.push(body);
      localStorage.setItem(listName, JSON.stringify(list));
      return list;
    }


  /**
   * update book
   *
   *
   * @param body
   */
  update(listName:string,body: Book): any {
    const list = this.list(listName);
    const index = list.findIndex(t => t.id === body.id);
    list[index] = body;
    localStorage.setItem(listName, JSON.stringify(list));
    return list;
  }

   /**
   * delete t
   *
   *
   * @param id
   */
    delete(listName:string,id: number): boolean {
      try {
        const list = this.list(listName);
        const index = list.findIndex(t => t.id === id);
        if (index > -1) {
          list.splice(index, 1);
          localStorage.setItem(listName, JSON.stringify(list));
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }

    }


   /**
   * change  order of Books
   *
   *
   */
  changeOrder(listName:string,bookToChangeOrder: Book, bookOfCurrentOrder: Book): any {
    const books = this.list(listName);
    const index = books.findIndex(b => b.id === bookToChangeOrder.id);
    const currentOrderIndex = books.findIndex(b => b.id === bookOfCurrentOrder.id);
    if (index === -1 || currentOrderIndex === -1) {
      return false;
    }
    books[index].order = books[currentOrderIndex].order;
    books[currentOrderIndex].order = bookToChangeOrder.order;
    localStorage.setItem(listName, JSON.stringify(books));
    books.sort((a, b) => a.order - b.order);
    return books;
  }

}
