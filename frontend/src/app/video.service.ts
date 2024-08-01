import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../app/video-list/video'; // Importe a interface

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(`${this.apiUrl}/${video.id}`, video);
  }

  createVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.apiUrl, video);
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchVideos(query: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/search?query=${query}`);
  }

}
