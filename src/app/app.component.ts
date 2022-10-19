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

  addMode: boolean = false;

  constructor(public dialog: MatDialog) {}

  /**
   * opens new toDo for for adding 
   * this has to check if the element click was indeed the column and not child elements
   * @param event the element that made the call
   * @returns None
   */
  handleColumnClick(event: any) {
    if (event.target !== event.currentTarget) return;
    this.addMode = true;
  }

  /**
   * verify the new todo input has at least 5 characters before allowing add
   * @returns true or false 
   */
  isValidInput(): boolean {
    return this.newTodo.name.length <= 5;
  }

  /**
   * handles adding new todo to list
   * resets new form back to original state
   */
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

  /**
   * given column and todo item. remove item from list
   * @param list the column where todos are stored
   * @param item the todo to delete
   */
  handleDelete(list: Column, item: ToDo){
    list.items = list.items.filter(x => x.name != item.name);
    /* TODO: Need to add unique identifier to todo object for efficient deletion*/
  }

  /**
   * reverts new form back to original state
   */
  handleCancel() {
    this.addMode = false
    this.newTodo = {
      name: '',
      status: Status.ToDo,
      onHoldReason: '',
      color: Color.LightBlue
    };
  }

  /**
   * handles changing the status of the todo object and adds todo object to list user dragged and dropped into
   * @param event 
   * @param status the status of the column the element was droped into 
   */
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
