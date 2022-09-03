import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveItem(item: string, value: any) {
    localStorage.setItem(item, value);
  }

  getItem(item: string) {
    const value = localStorage.getItem(item);
    return value;
  }

  removeItem(item: string) {
    localStorage.removeItem(item);
  }
}
