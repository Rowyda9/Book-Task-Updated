import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  async openDialog(title: string): Promise<boolean> {
    // return false;
    return await firstValueFrom(this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: title,
      }).afterClosed());

    }


}

