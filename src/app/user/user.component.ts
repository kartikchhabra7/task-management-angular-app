import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  userSignUp: any = {
    id: new Date().getTime(),
    userName: '',
    email: '',
    password: '',
  };

  userLogin: any = {
    email: '',
    password: '',
  };

  storeUserData: any = JSON.parse(
    this.service.getItemFromStorage('userSignUp') || '[]'
  );
  loggedInUser: any = JSON.parse(
    this.service.getItemFromStorage('login') || 'null'
  );

  activeForm: any = 'login' || 'signup';

  showPassword: boolean = false;

  uniqueToDoDataKey: string = '';

  uniqueToDoData: any = JSON.parse(
    this.service.getItemFromStorage(this.uniqueToDoDataKey) || '[]'
  );

  inputValue: string = '';

  editUniqueUserToDoId: any | null = null;
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.updateUniqueToDoDataKey();
    console.log(this.storeUserData);
    console.table(this.storeUserData);
    console.log(this.uniqueToDoData);
  }

 
  // user login and log out details
  
  createUserAccount() {
    const existedUser = this.storeUserData.find(
      (user: any) => user.email === this.userSignUp.email
    );
    if (existedUser) {
      this.service.showNotification(
        alert,
        'This user email is already existed Kindly try with new one !'
      );
    } else {
      this.storeUserData.push({ ...this.userSignUp });
      this.service.setItemFromStorage(
        'userSignUp',
        JSON.stringify(this.storeUserData)
      );
      console.log(this.storeUserData);
      this.service.showNotification(alert, `user addded`);
      this.activeForm = 'login';
    }
  }

  loginUserAccount() {
    const foundUser = this.storeUserData.find(
      (user: any) =>
        user.email === this.userLogin.email &&
        user.password === this.userLogin.password
    );
    if (foundUser) {
      this.loggedInUser = foundUser;
      this.service.setItemFromStorage('login', JSON.stringify(foundUser));
      this.service.showNotification(alert, 'User matched');

      this.service.updateRefresh();
    } else {
      this.service.showNotification(window.alert, 'Invalid email or password');
    }
  }

  logOutUserAccount() {
    this.service.updateRefresh();
    this.service.removeItemInStorage('login');
  }

  setActiveForm(form: any) {
    this.activeForm = form;
  }

   // different todo for each user

   updateUniqueToDoDataKey() {
    if (this.loggedInUser && this.loggedInUser.email) {
      this.uniqueToDoDataKey = 'userData_' + this.loggedInUser.email;
      this.uniqueToDoData = JSON.parse(
        this.service.getItemFromStorage(this.uniqueToDoDataKey) || '[]'
      );
    }
  }

  saveToDoData(data: string) {
    // I passed data as an argument for the input value. If we don't use the output decorator, we don't need to pass data; we can directly pass inputValue.
    if (data.trim() !== '') {
      const userToDoId = new Date().getTime();
      this.uniqueToDoData.push({ name: data, id: userToDoId });
      this.service.setItemFromStorage(
        this.uniqueToDoDataKey,
        JSON.stringify(this.uniqueToDoData)
      );
      console.log(this.uniqueToDoData);
    }
  }

  editDataInUniqueToDo(data: any) {
    this.editUniqueUserToDoId = data.id;
    this.inputValue = data.name;
  }

  updateDataInUniqueToDo(updateInputValue: any) {
    if (this.editUniqueUserToDoId !== null) {
      const updateData = {
        id: this.editUniqueUserToDoId,
        name: updateInputValue, // I passed updatedInputValue as an argument for the input value. If we don't use the output decorator, we don't need to pass data; we can directly pass inputValue in name key.
      };

      const updatedArray = this.uniqueToDoData.map((item: any) =>
        item.id===this.editUniqueUserToDoId ? updateData : item
      );

      this.uniqueToDoData = updatedArray;

      this.editUniqueUserToDoId = null;
      console.log(this.uniqueToDoData);
      this.service.setItemFromStorage(
        this.uniqueToDoDataKey,
        JSON.stringify(this.uniqueToDoData)
      );
    }
  }
  // updateDataInUniqueToDo(updatedData: any) {
  //   if (this.editUniqueUserToDoId !== null) {
  //     const updatedArray = this.uniqueToDoData.map((item: any) =>
  //       item.id === this.editUniqueUserToDoId
  //         ? { ...item, name: updatedData }
  //         : item
  //     );

  //     this.uniqueToDoData = updatedArray;
  //     this.editUniqueUserToDoId = null;

  //     this.service.setItemFromStorage(
  //       this.uniqueToDoDataKey,
  //       JSON.stringify(this.uniqueToDoData)
  //     );

  //     console.log(this.uniqueToDoData);
  //   }
  // }

  deleteDataFromTodo(index: number) {
    this.uniqueToDoData.splice(index, 1);
    this.service.setItemFromStorage(
      this.uniqueToDoDataKey,
      JSON.stringify(this.uniqueToDoData)
    );
    console.log(this.uniqueToDoData);
  }

  deleteAllDataFromToDo(){
    this.uniqueToDoData=[]
    this.service.removeItemInStorage(this.uniqueToDoDataKey)
  }

}
