import { Injectable } from '@angular/core';
import { defaultBooks } from '@constants/book-list';
import { LocalStorage } from '@constants/local-storage';
import { Book } from '@models/book/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService  {
  protected localStorageKey = LocalStorage.BooksRepo;
 /**
   * get ts details
   *
   *
   * @param id
   */
  get(id: number): Book {
    return this.list().find(t => t.id === id)!;
  }

  /**
   * list all Books
   *
   *
   */
    list(): Book[] {
      if(localStorage.getItem(this.localStorageKey)){
        return ((JSON.parse(localStorage.getItem(this.localStorageKey) ?? '[]')) as Book[])
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
    create(body: Book): any {
      const list = this.list();
      body.id = list.length + 1;
      body.order = list.length + 1;
      list.push(body);
      localStorage.setItem(this.localStorageKey, JSON.stringify(list));
      return list;
    }


  /**
   * update book
   *
   *
   * @param body
   */
  update(body: Book): any {
    const list = this.list();
    const index = list.findIndex(t => t.id === body.id);
    list[index] = body;
    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
    return list;
  }

   /**
   * delete t
   *
   *
   * @param id
   */
    delete(id: number): boolean {
      try {
        const list = this.list();
        const index = list.findIndex(t => t.id === id);
        if (index > -1) {
          list.splice(index, 1);
          localStorage.setItem(this.localStorageKey, JSON.stringify(list));
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }

    }




   /**
   * Delete list all Books
   *
   *
   */
  deleteAll(): any {
    console.clear();
    localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    return true;
  }

  /**
   * Add list of Books
   *
   *
   */
  addList(){
    const books = [
      {
        id:1,
        order:1,
        publishYear : 1965,
        authorName: 'Frank Herbert',
        title: 'Dune',
        poster: 'https://m.media-amazon.com/images/I/71I4xUFNGpL._AC_SL1500_.jpg',
      },
      {
        id:2,
        order:2,
        publishYear : 1985,
        authorName: 'Orson Scott Card',
        title: "Ender's Game",
        poster:
          'https://images-na.ssl-images-amazon.com/images/I/51YfSAtW63L._SX304_BO1,204,203,200_.jpg',
      },
      {
        id:3,
        order:3,
        publishYear : 1949,
        authorName: 'George Revenge',
        title: '1984',
        poster:
          'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_600,h_928/https://www.jltstore.com/wp-content/uploads/2021/04/81U4kNa3BVL.jpg',
      },
      {
        id:4,
        order:4,
        publishYear : 1953,
        authorName: 'Ray Bradbury',
        title: 'Fahrenheit 451',
        poster: 'https://images-na.ssl-images-amazon.com/images/I/51WTp7hAmfL._SX324_BO1,204,203,200_.jpg',
      },
      {
        id:5,
        order:5,
        publishYear : 1932,
        authorName: 'Aldous Huxley',
        title: 'Brave New World',
        poster: 'https://images-na.ssl-images-amazon.com/images/I/51qUjJFVSpL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
      }
    ];

    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }


   /**
   * change  order of Books
   *
   *
   */
  changeOrder(bookToChangeOrder: Book, bookOfCurrentOrder: Book): any {
    const books = this.list();
    const index = books.findIndex(b => b.id === bookToChangeOrder.id);
    const currentOrderIndex = books.findIndex(b => b.id === bookOfCurrentOrder.id);
    if (index === -1 || currentOrderIndex === -1) {
      return false;
    }
    books[index].order = books[currentOrderIndex].order;
    books[currentOrderIndex].order = bookToChangeOrder.order;
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
    books.sort((a, b) => a.order - b.order);
    return books;
  }

}
