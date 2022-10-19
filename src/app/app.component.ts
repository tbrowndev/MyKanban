import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo: string[] = [];
  inProgress: string[] = [];
  onHold: string[] = [];
  done: string[] = [];

  newTodo: string = '';
  addMode: boolean = false;

  handleColumnClick(event: any) {
    if (event.target !== event.currentTarget) return;
    this.addMode = true;
  }

  handleAdd() {
    this.todo.push(this.newTodo);
    this.addMode = false;
    this.newTodo = '';
  }

  handleCancel() {
    this.addMode = false
    this.newTodo = '';

  }

  handleDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
