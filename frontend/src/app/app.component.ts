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

  constructor(private musicService: MusicListService) {}

  ngOnInit() {
    this.updateMusicList();
  }

  updateMusicList() {
    this.musicService.listMusic()
      .subscribe((music: Music[]) => {
        this.music = music;
      });
  }

  addMusic() {
    const newMusic: Music = {
      _id: undefined,
      category: "",
      title: "",
      url: ""
    };

    this.musicService.createMusic(newMusic)
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
    this.musicService.updateMusic(music._id!, { ...music, _id: undefined })
      .subscribe(() => {
        this.updateMusicList();
      });
  }

  // TASK 3.3 START
  deleteMusic(music: Music) {
    this.musicService.deleteMusic(music._id!)
      .subscribe(() => {
        this.updateMusicList();
      });
  }
  // TASK 3.3 END

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
