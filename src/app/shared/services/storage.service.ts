import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  clearStorage(){
    window.localStorage.clear();
  }

  setLoginData(uid: string) {
    window.localStorage.setItem('uid', uid);
  }

  isLogged(): boolean {
    return !!window.localStorage.getItem('uid');
  }

  getUID(): string {
    const uid = window.localStorage.getItem('uid');
    if (!uid) return '';
    return uid
  }
}
