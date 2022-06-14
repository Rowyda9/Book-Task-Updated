import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assets } from '@constants/assets';
import { LocalStorage } from '@constants/local-storage';
import { AppRoutes } from '@constants/routes';
import { FacadeService } from '@services/facade.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  listNames:string[]=[];
  listName:string =LocalStorage.DefaultList;
imgUrl:string = Assets.Empty;
breakpoint: number = 3;
get routes(): typeof AppRoutes {
  return AppRoutes;
}

constructor(private facadeService: FacadeService, private router: Router) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.getBookLists();
  }

  /**
   * get all list of books
   *
   */
   getBookLists() {
    this.listNames = this.facadeService.bookListService.getAll();
  }

    /**
   * set default list of books
   *
   */
     seedBookData() {
      this.facadeService.bookListService.addDefaultList();
      this.getBookLists();
      this.facadeService.snackbarService.secondary("Book list has been updated successfully");
   }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }
 /**
   * delete list
   *
   * @param name
   */
  async deleteList(name: string): Promise<void> {
    if (await this.facadeService.dialogService.openDialog(name)) {
    const isDeleted = this.facadeService.bookListService.deleteList(name);
    if (isDeleted) {
      this.getBookLists();
      this.facadeService.snackbarService.success("List has been deleted successfully");
    }
  }
  }

   /**
   * delete all list
   *
   */
    async clearAll(): Promise<void> {
      if (await this.facadeService.dialogService.openDialog("Clear All")) {
      const isDeleted = this.facadeService.bookListService.deleteAll();
      if (isDeleted) {
        this.getBookLists();
        this.facadeService.snackbarService.success("Lists has been deleted successfully");
      }
    }
    }
  /**
   * add new list
   *
   */
    addNewList() {
      const listName ="List"+ (+this.listNames.length+1);
      localStorage.setItem(listName,JSON.stringify([]));
      this.router.navigateByUrl(AppRoutes.ManageBook+"/"+listName);
  }


}
