import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveItem(item: string, value: string) {
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
