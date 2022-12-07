import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getData(key: string) {
    return localStorage.getItem(key);
  }

  setData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
