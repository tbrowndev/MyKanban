import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToDo } from './types/todo';
import { Status } from './types/status';
import { Color } from './types/color';
import { Column } from './types/column';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo: Column = { color: Color.Blue, items: []};
  inProgress: Column = { color: Color.LightBlue, items: []};
  onHold: Column = { color: Color.Red, items: []};
  done: Column = { color: Color.Green, items: []};

  newTodo: ToDo = {
    name: '',
    status: Status.ToDo,
    onHoldReason: '',
    color: Color.Blue
  };

  addMode: boolean = true;

  handleColumnClick(event: any) {
    if (event.target !== event.currentTarget) return;
    this.addMode = true;
  }

  handleAdd() {
    this.todo.items.push(this.newTodo);
    this.addMode = false;
    this.newTodo = {} as ToDo;
  }

  handleCancel() {
    this.addMode = false
    this.newTodo = {} as ToDo;

  }

  handleDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
