import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: MatSnackBar) {}

  public toastSuccess(message: string, button?: string) {
    return this.toast.open(message, button, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['toastSuccess']
    })
  }

  public toastWarning(message: string, button?: string) {
    return this.toast.open(message, button, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['toastWarning']
    })
  }

  public toastError(message: string, button?: string) {
    return this.toast.open(message, button, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['toastError'],
        
    })
  }
}
