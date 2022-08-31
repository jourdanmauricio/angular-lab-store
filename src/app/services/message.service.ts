import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

interface message {
  panelClass: 'snackbar-error' | 'snackbar-success' | 'snackbar-info';
  duration: number;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackbar: MatSnackBar) {}

  showMsg(msg: string, type: string, btn: string = 'cerrar') {
    let panelClass: message;
    switch (type) {
      case 'error':
        panelClass = {
          duration: 2500,
          panelClass: 'snackbar-error',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        };
        break;
      case 'success':
        panelClass = {
          duration: 1500,
          panelClass: 'snackbar-success',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        };
        break;
      case 'info':
        panelClass = {
          duration: 2000,
          panelClass: 'snackbar-info',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        };
        break;
      default:
        panelClass = {
          duration: 2000,
          panelClass: 'snackbar-info',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        };
        break;
    }

    this.snackbar.open(msg, btn, panelClass);
  }
}
