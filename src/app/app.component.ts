import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtInputComponent } from './lib/at-input/at-input.component';
import { AtTextareaComponent } from './lib/at-textarea/at-textarea.component';
import { AtNotificationService } from './lib/at-notification/service/at-notification.service';
import { AtNotificationComponent } from './lib/at-notification/at-notification.component';
import { AtLoaderComponent } from './lib/at-loader/at-loader.component';
import { AtSelectComponent } from './lib/at-select/at-select.component';
import { AtFileinputComponent } from './lib/at-fileinput/at-fileinput.component';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'qr-generator';
  loading: boolean = false;

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
    image: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: AtNotificationService
  ) {}

  enviar(): void {
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
}
