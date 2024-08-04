import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsService } from './posts.service';
import { CommonModule } from '@angular/common';

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular pwa';
  posts: Posts[] = [];
  
  constructor(private postsService: PostsService) {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


}
