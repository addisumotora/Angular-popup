import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'popup';
  selectedOption: string = '';
  showPopup = false;

  options: string[] = [
    'electronics',
    'jewelry',
    "men's clothing",
    "women's clothing",
  ];
  
  selectOption(option: string) {
    this.selectedOption = option;
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
