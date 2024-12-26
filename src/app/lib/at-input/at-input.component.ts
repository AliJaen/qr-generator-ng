import { NgClass, NgFor } from '@angular/common';
import { Component, forwardRef, Input, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'authype-input',
  standalone: true,
  imports: [NgClass, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtInputComponent),
      multi: true,
    },
  ],
  templateUrl: './at-input.component.html',
  styleUrl: './at-input.component.css',
})
export class AtInputComponent implements ControlValueAccessor {
  @Input() lines: number = 3;
  @Input() label: string = '';
  @Input() type: 'text' | 'mail' | 'password' = 'text';
  @Input() isDisabled?: boolean = false;

  @Input() formControlName?: string;

  get formControl(): FormControl | null {
    if (this.formControlName && this.controlContainer) {
      return this.controlContainer?.control?.get(
        this.formControlName
      ) as FormControl | null;
    }
    return null;
  }

  constructor(@Optional() private controlContainer: ControlContainer) {}

  value: string = '';

  private onChange = (value: string) => {};
  public onTouched = () => {};

  writeValue(value: any): void {
    if (this.formControl && this.formControl.value !== value) {
      this.formControl.setValue(value, { emitEvent: false });
    } else {
      this.value = value;
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
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
