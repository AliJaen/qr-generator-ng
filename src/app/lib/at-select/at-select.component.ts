import { NgClass, NgFor } from '@angular/common';
import { Component, forwardRef, Input, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'authype-select',
  standalone: true,
  imports: [NgClass, NgFor, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './at-select.component.html',
  styleUrl: './at-select.component.css',
})
export class AtSelectComponent implements ControlValueAccessor {
  @Input() items: any[] = [];
  @Input() selectLabel: string = '';
  @Input() selectValue: string = '';
  @Input() lines: number = 3;
  @Input() label: string = '';

  get formControl(): FormControl | null {
    return this.controlContainer?.control?.get(
      this.formControlName
    ) as FormControl | null;
  }

  @Input() formControlName!: string;

  constructor(@Optional() private controlContainer: ControlContainer) {}

  private onChange = (value: any) => {};
  public onTouched = () => {};

  writeValue(value: any): void {
    if (this.formControl && this.formControl.value !== value)
      this.formControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (this.formControl)
      isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.onChange(select.value);
  }

  getLabelCharacters(): Array<{ char: string; index: number }> {
    return this.label.split('').map((char, i) => ({
      char,
      index: i >= 3 ? 3 : i,
    }));
  }
}
