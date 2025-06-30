import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: { username: string, role: string } | null = null;
  private sub?: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.sub = this.userService.user.subscribe(u => {
      this.user = u;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
