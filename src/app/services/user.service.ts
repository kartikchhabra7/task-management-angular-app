import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getItemFromStorage(key: string) {
    return localStorage.getItem(key);
  }

  setItemFromStorage(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  removeItemInStorage(key: string) {
    return localStorage.removeItem(key);
  }

  updateRefresh() {
   return window.location.reload();
  }

  showNotification(callback: (message: string) => void, message: string) {
    return callback(message);
  }

}
