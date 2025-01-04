import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  authype: string = 'https://www.authype.com';
  visit(): void {
    window.open(this.authype, '_blank');
  }
}
