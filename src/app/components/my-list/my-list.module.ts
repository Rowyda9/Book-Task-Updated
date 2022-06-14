import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyListRoutingModule } from './my-list-routing.module';
import { MyListComponent } from './my-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    MyListComponent
  ],
  imports: [
    CommonModule,
    MyListRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class MyListModule { }
