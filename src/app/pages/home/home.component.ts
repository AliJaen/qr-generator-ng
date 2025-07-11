import { Component } from '@angular/core';
import { AtInputComponent } from '../../lib/at-input/at-input.component';
import { AtTextareaComponent } from '../../lib/at-textarea/at-textarea.component';
import { AtSelectComponent } from '../../lib/at-select/at-select.component';
import { AtFileinputComponent } from '../../lib/at-fileinput/at-fileinput.component';
import { AtColorpickerComponent } from '../../lib/at-colorpicker/at-colorpicker.component';
import { AtChipsComponent } from '../../lib/at-chips/at-chips.component';
import { AtPhoneinputComponent } from '../../lib/at-phoneinput/at-phoneinput.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtNotificationService } from '../../lib/at-notification/service/at-notification.service';
import { AtLoaderComponent } from '../../lib/at-loader/at-loader.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AtFileinputComponent,
    AtInputComponent,
    AtSelectComponent,
    AtTextareaComponent,
    AtColorpickerComponent,
    AtChipsComponent,
    AtPhoneinputComponent,
    AtLoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
