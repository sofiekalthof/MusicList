import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from './models/music';

@Injectable({
  providedIn: 'root'
})
export class MusicListService {

  private apiurl = "http://localhost:3600"

  constructor(private http: HttpClient) { }

  listMusic() {
    return this.http.get<Music[]>(`${this.apiurl}/music`);
  }

  getMusic(id: string) {
    return this.http.get<Music>(`${this.apiurl}/music/${id}`);
  }

  createMusic(music: Music) {
    return this.http.post(`${this.apiurl}/music`, music);
  }

  updateMusic(id: string, music: Music) {
    return this.http.put(`${this.apiurl}/music/${id}`, music);
  }

  deleteMusic(id: string) {
    return this.http.delete(`${this.apiurl}/music/${id}`);
  }
}