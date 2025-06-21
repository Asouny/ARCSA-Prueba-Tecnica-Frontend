import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getTareas() {
    return this.http.get(this.apiUrl, this.getAuthHeaders());
  }

  deleteTarea(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  createTarea(data: any) {
    return this.http.post(
      'http://localhost:3000/tasks',
      data,
      this.getAuthHeaders()
    );
  }

  updateTarea(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/tasks/${id}`,
      data,
      this.getAuthHeaders()
    );
  }
}
