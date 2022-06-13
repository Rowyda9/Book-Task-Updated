import { Component } from '@angular/core';
import { AppRoutes } from '@constants/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  get appRoutes(): typeof AppRoutes {
    return AppRoutes;
  }
  constructor() { }

}
