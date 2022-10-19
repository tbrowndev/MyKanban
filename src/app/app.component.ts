import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToDo } from './types/todo';
import { Status } from './types/status';
import { Color } from './types/color';
import { Column } from './types/column';
import { MatDialog } from '@angular/material/dialog';
import { ReasonDialogComponent } from './components/reason-dialog/reason-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo: Column = { status: Status.ToDo, color: Color.LightBlue, items: []};
  inProgress: Column = { status: Status.InProgress, color: Color.Blue, items: []};
  onHold: Column = { status: Status.OnHold, color: Color.Red, items: []};
  done: Column = { status: Status.Done, color: Color.Green, items: []};

  newTodo: ToDo = {
    name: '',
    status: Status.ToDo,
    onHoldReason: '',
    color: Color.LightBlue
  };

  addMode: boolean = true;

  constructor(public dialog: MatDialog) {}

  handleColumnClick(event: any) {
    if (event.target !== event.currentTarget) return;
    this.addMode = true;
  }

  handleAdd() {
    this.todo.items.push(this.newTodo);
    this.addMode = false;
    this.newTodo = {
      name: '',
      status: Status.ToDo,
      onHoldReason: '',
      color: Color.LightBlue
    };
  }

  handleCancel() {
    this.addMode = false
    this.newTodo = {
      name: '',
      status: Status.ToDo,
      onHoldReason: '',
      color: Color.LightBlue
    };
  }

  handleDrop(event: any, status: Status) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].status = status;
      if (event.container.data[event.currentIndex].status == Status.OnHold) {
        const dialogRef = this.dialog.open(ReasonDialogComponent, {
          data: event.container.data[event.currentIndex]
        });

        dialogRef.afterClosed().subscribe(reason => {
          event.container.data[event.currentIndex].onHoldReason = reason;
        })
      }
    }
  }
}
