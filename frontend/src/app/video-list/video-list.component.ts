import { Component, OnInit } from '@angular/core';
import { Video } from './video'; // Importe a interface
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;
  searchTerm: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }

  openEditModal(video: Video) {
    this.selectedVideo = { ...video }; // Cria uma cópia do vídeo selecionado
  }

  closeModal() {
    this.selectedVideo = null;
  }

  updateVideo() {
    if (this.selectedVideo) {
      if (!this.selectedVideo.id) {
        // Create a new video
        this.videoService.createVideo(this.selectedVideo).subscribe(() => {
          this.loadVideos(); // Recarrega a lista de vídeos
          this.closeModal();
        });
      } else {
        // Update an existing video
        this.videoService.updateVideo(this.selectedVideo).subscribe(() => {
          this.loadVideos(); // Recarrega a lista de vídeos
          this.closeModal();
        });
      }
    }
  }

  aaddVideo() {
    const newVideo: Video = { id: 0, nome: '', link: '' };
    this.selectedVideo = newVideo;
    this.openEditModal(newVideo);
  }

  deleteVideo(video: Video) {
    this.videoService.deleteVideo(video.id).subscribe(() => {
      this.loadVideos(); // Recarrega a lista de vídeos
    });
  }

  searchVideos() {
    if (this.searchTerm.trim()) {
      this.videoService.searchVideos(this.searchTerm).subscribe((data) => {
        this.videos = data;
      });
    } else {
      this.loadVideos();
    }
  }


}
