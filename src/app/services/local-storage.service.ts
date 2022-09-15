import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveItem(item: string, value: any) {
    localStorage.setItem(item, JSON.stringify(value));
  }

  getItem(item: string) {
    let value = localStorage.getItem(item);
    if (value) value = JSON.parse(value);
    return value;
  }

  removeItem(item: string) {
    localStorage.removeItem(item);
  }
}
