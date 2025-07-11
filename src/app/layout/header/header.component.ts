import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, SessionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
