import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() loggedInUser: any;
  @Input() uniqueToDoData: any;
  @Input() inputValue: any;
  @Output() logOutUserAccount = new EventEmitter();
  @Output() saveToDoData = new EventEmitter();
  @Output() deleteDataFromTodo = new EventEmitter();
  @Output() editDataInUniqueToDo = new EventEmitter();
  @Output() updateDataInUniqueToDo = new EventEmitter();
  @Output() deleteAllDataFromToDo = new EventEmitter();

  isUserEditActive: boolean = false;

  constructor(private service: UserService) {}

  logOutUser() {
    const shouldLogged: any = this.service.showNotification(
      confirm,
      'Are You Sure You Want to Log Out of this device.'
    );

    if (shouldLogged) {
      this.logOutUserAccount.emit();
    }
  }

  saveData() {
    this.saveToDoData.emit(this.inputValue);
    this.inputValue = '';
  }

  deleteData(index: number) {
    const shouldDeleted: any = this.service.showNotification(
      confirm,
      'Please Confirm if you intend to delete'
    );
    if (shouldDeleted) {
      this.deleteDataFromTodo.emit(index);
    }
  }

  editData(item: any) {
    this.isUserEditActive = true;
    this.editDataInUniqueToDo.emit(item);
    console.log(item);
  }

  updateData() {
    this.updateDataInUniqueToDo.emit(this.inputValue);
    this.inputValue = '';
    this.isUserEditActive = false;
  }

  deleteAllData() {
    const shouldDeleted: any = this.service.showNotification(
      confirm,
      'Are You want to delete all data Data will not be recovered'
    );
    if (shouldDeleted) {
      this.deleteAllDataFromToDo.emit();
    }
  }

  clearInputValue() {
    this.inputValue = '';
    this.isUserEditActive = false;
  }
  // getCurrentDate(): string {
  //   const formattedDate = new Date().toDateString(); // Format: YYYY-MM-DD
  //   const formattedTime = new Date().toLocaleTimeString();
  //   return formattedDate + '  |  ' + formattedTime;
  // }

  formattedDate: any =
    new Date().toDateString() + ' | ' + new Date().toLocaleTimeString();
  selectPriority: any = '';
  onChangePriority(event: any) {
    console.log(event.target.value);
  }
}
