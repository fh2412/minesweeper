import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-win-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './win-dialog.component.html',
  styleUrl: './win-dialog.component.scss'
})
export class WinDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:   
 {message: string}
  ) {}

  closeDialog(action: string): void {
    this.dialogRef.close(action);
  }
}
