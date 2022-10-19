import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo = [
    'Wake Up',
    'Brush Teeth',
    'Get Dressed',
    'Tie Shoes',
    'Go to Work',
    'Complete Work Stuff',
    'Go Home',
    'Get ready for bed',
    'Go to bed'
  ];

  inProgress = [];
  onHold = [];
  done = [];

  handleColumnClick(event: any) {
    if (event.target !== event.currentTarget) return;
    console.log('New ToDo for board')
  }

  handleDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
