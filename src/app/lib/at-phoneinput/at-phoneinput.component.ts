import { NgClass, NgFor } from '@angular/common';
import { Component, forwardRef, Input, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'authype-phoneinput',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtPhoneinputComponent),
      multi: true,
    },
  ],
  templateUrl: './at-phoneinput.component.html',
  styleUrl: './at-phoneinput.component.css',
})
export class AtPhoneinputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() formControlName?: string;

  get formControl(): FormControl | null {
    if (this.formControlName && this.controlContainer) {
      return this.controlContainer?.control?.get(
        this.formControlName
      ) as FormControl | null;
    }
    return null;
  }

  countries = [
    { name: 'Mexico', code: 'MX', dialCode: '52' },
    { name: 'United States', code: 'US', dialCode: '1' },
    { name: 'Canada', code: 'CA', dialCode: '1' },
    { name: 'Spain', code: 'ES', dialCode: '34' },
  ];

  selectedCountryCode: string = this.countries[0].dialCode;
  phoneNumber: string = '';

  constructor(@Optional() private controlContainer: ControlContainer) {}

  value: string = '';

  private onChange = (value: string) => {};
  public onTouched = () => {};

  writeValue(value: any): void {
    if (this.formControl && this.formControl.value !== value) {
      this.formControl.setValue(value, { emitEvent: false });
    } else {
      this.value = `${this.selectedCountryCode}${this.phoneNumber}`;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.formControl) {
      isDisabled ? this.formControl.disable() : this.formControl.enable();
    }
  }

  onCountryCodeChange() {
    this.emitPhoneChange();
  }

  onPhoneNumberChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.phoneNumber = input.value;
    this.emitPhoneChange();
  }

  private emitPhoneChange() {
    const value =
      this.phoneNumber !== ''
        ? `${this.selectedCountryCode}${this.phoneNumber}`
        : '';
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  getLabelCharacters(): Array<{ char: string; index: number }> {
    return this.label.split('').map((char, i) => ({
      char,
      index: i >= 3 ? 3 : i,
    }));
  }
}
