import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiToken } from '../interceptors/token.interceptor';
import { Settings } from '../models/setting.model';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings = new BehaviorSubject<Settings>({
    status: 'active',
    hintSku: false,
    pictures: [],
    condition: 'new',
    listing_type_id: '',
    price_percent_ml: 0,
    price_percent_web: 0,
  });
  settings$ = this.settings.asObservable();

  private apiUrl = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) {}

  getSettings() {
    return this.http
      .get<Settings>(`${this.apiUrl}/settings`, { context: apiToken('API') })
      .pipe(
        tap((settings) => {
          console.log('Settings', settings);
          this.settings.next(settings);
        })
      );
  }

  updateSettings(id: number, data: Settings) {
    let settings = { setting: data };
    return this.http
      .put<Settings>(`${this.apiUrl}/settings/${id}`, settings, {
        context: apiToken('API'),
      })
      .pipe(
        tap((settings) => {
          console.log('Settings', settings);
          this.settings.next(settings);
        })
      );
  }
}
