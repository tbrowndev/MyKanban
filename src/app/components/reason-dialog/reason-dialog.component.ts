import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToDo } from 'src/app/types/todo';

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.css']
})
export class ReasonDialogComponent {

  constructor(public dialogRef: MatDialogRef<ReasonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ToDo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
