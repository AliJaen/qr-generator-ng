import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  itemsMenu = [
    { label: 'Home', navigate: '/home' },
    { label: 'My QR codes', navigate: '/qr-codes' },
    { label: 'Account', navigate: '/account' },
  ];
}
