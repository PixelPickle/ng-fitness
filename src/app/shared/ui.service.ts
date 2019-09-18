import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UIService {

  constructor(
    private matSnackBar: MatSnackBar
  ) {}

  showSnackBar( message, action, duration ) {
    this.matSnackBar.open(message, action, {duration} );
  }
}
