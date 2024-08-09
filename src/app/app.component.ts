import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsService } from './posts.service';
import { NetworkService } from './network.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular pwa';
  posts: Posts[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private postsService: PostsService,
    private networkService: NetworkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.subscription = this.networkService.onlineStatus$.subscribe({
      next: (isOnline) => {
        if (isOnline) {
          this.snackBar.open('You are now online', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('You are offline', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
