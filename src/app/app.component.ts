import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtInputComponent } from './lib/at-input/at-input.component';
import { AtTextareaComponent } from './lib/at-textarea/at-textarea.component';
import { AtNotificationService } from './lib/at-notification/service/at-notification.service';
import { AtNotificationComponent } from './lib/at-notification/at-notification.component';
import { AtLoaderComponent } from './lib/at-loader/at-loader.component';
import { AtSelectComponent } from './lib/at-select/at-select.component';
import { AtFileinputComponent } from './lib/at-fileinput/at-fileinput.component';
import { AtColorpickerComponent } from './lib/at-colorpicker/at-colorpicker.component';
import { AtChipsComponent } from './lib/at-chips/at-chips.component';
import { AtPhoneinputComponent } from './lib/at-phoneinput/at-phoneinput.component';
import { AtCarouselComponent } from './lib/at-carousel/at-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AtFileinputComponent,
    AtInputComponent,
    AtLoaderComponent,
    AtNotificationComponent,
    AtSelectComponent,
    AtTextareaComponent,
    AtColorpickerComponent,
    AtChipsComponent,
    AtPhoneinputComponent,
    AtCarouselComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'qr-generator';
  loading: boolean = false;

  images = [
    { src: '../assets/img/bell.svg', alt: 'bell' },
    { src: '../assets/img/bus.svg', alt: 'bus' },
    { src: '../assets/img/key.svg', alt: 'key' },
    { src: '../assets/img/qr.svg', alt: 'qr' },
  ];

  errorsTypes = [
    { value: 'L', label: 'Low (L)' },
    { value: 'M', label: 'Medium (M)' },
    { value: 'Q', label: 'Quality (Q)' },
    { value: 'H', label: 'High (H)' },
  ];
  testForm = this.formBuilder.group({
    texto: ['', Validators.required],
    textoLargo: ['', Validators.required],
    correctionLabel: ['', Validators.required],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(12)],
    ],
    image: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: AtNotificationService
  ) {}

  handleColor(selectedColor: string | { r: number; g: number; b: number }) {
    console.log(selectedColor);
  }

  enviar(): void {
    console.log(this.testForm.value);

    if (this.testForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.notificationService.add({
          type: 'success',
          title: 'Success',
          message: 'Information saved succesfully',
        });
        this.loading = false;
      }, 3000);
    } else {
      this.testForm.markAllAsTouched();
    }
  }

  getTags(tags: string[]): void {
    console.log(tags);
  }
}
