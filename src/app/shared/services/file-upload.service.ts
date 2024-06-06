import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = 'https://apkmanagerbackend-production.up.railway.app';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, appId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('app_id', appId);

    const headers = new HttpHeaders({
      // 'Authorization': 'Bearer your-token', // Uncomment and add your authorization token if needed
    });

    return this.http.post<any>(`${this.uploadUrl}/storage`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error according to your application's requirements
    console.error('File upload error:', error);
    throw error;
  }
}