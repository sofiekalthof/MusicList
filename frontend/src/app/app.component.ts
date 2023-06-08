import { Component, OnInit } from '@angular/core';
import { MusicListService } from './musiclist.service'
import { Music } from './models/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'url', 'actions'];
  title = 'MusicList';
  music: Music[] | null = null;
  editingMusic: Music | null = null;

  constructor(private musicListService: MusicListService) {}

  ngOnInit() {
    this.updateMusicList();
  }

  updateMusicList() {
    this.musicListService.listMusic()
      .subscribe((music: Music[]) => {
        this.music = music;
      });
  }

  addMusic() {
    const newMusic: Music = {
      category: " ",
      title: " ",
      url: " "
    };

    this.musicListService.createMusic(newMusic)
      .subscribe((data: any) => {
        this.updateMusicList();
        this.editingMusic = {
          ...newMusic,
          _id: data._id
        };
      });
  }

  editMusic(music: Music) {
    this.editingMusic = music;
  }

  doneEditing() {
    if (!this.editingMusic) return;

    this.updateMusic(this.editingMusic);

    this.editingMusic = null;
  }

  updateMusic(music: Music) {
    this.musicListService.updateMusic(music._id!, music)
      .subscribe(() => {
        this.updateMusicList();
      });
  }

  // Task 3.2 Starts here
  
  // Task 3.2 Ends here

  categoryChanged(target: EventTarget | null) {
    if (!target || !this.editingMusic) return;
    this.editingMusic = { ...this.editingMusic, category: (<HTMLInputElement>target).value };
  }

  titleChanged(target: EventTarget | null) {
    if (!target || !this.editingMusic) return;
    this.editingMusic = { ...this.editingMusic, title: (<HTMLInputElement>target).value };
  }

  urlChanged(target: EventTarget | null) {
    if (!target || !this.editingMusic) return;
    this.editingMusic = { ...this.editingMusic, url: (<HTMLInputElement>target).value};
  }
}
