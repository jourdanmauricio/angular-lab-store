import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { apiToken } from '@core/interceptors/token.interceptor';
import { ISettings, ISettingsState } from '../models/index';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) {}

  getSettings() {
    return this.http.get<ISettingsState>(`${this.apiUrl}/settings`, {
      context: apiToken('API'),
    });
  }

  updateSettings(id: number, data: ISettingsState) {
    let settings = { setting: data };
    return this.http
      .put<ISettings>(`${this.apiUrl}/settings/${id}`, settings, {
        context: apiToken('API'),
      })
      .pipe(
        tap((settings) => {
          console.log('Settings', settings);
        })
      );
  }
}
