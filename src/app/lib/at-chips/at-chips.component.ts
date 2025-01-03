import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'authype-chips',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './at-chips.component.html',
  styleUrl: './at-chips.component.css',
})
export class AtChipsComponent {
  @Input() placeholder: string = 'Add a tag...';
  @Input() separator: 'space' | 'enter' = 'enter';
  @Input() label: string = '';
  @Output() chipsChange = new EventEmitter<string[]>();

  chips: string[] = [];
  inputValue: string = '';

  onKeydown(event: KeyboardEvent): void {
    const isSeparator =
      this.separator === 'enter' ? event.key === 'Enter' : event.key === ' ';
    if (isSeparator && this.inputValue.trim()) {
      event.preventDefault();
      this.addChip();
    }
  }

  addChipOnBlur(): void {
    if (this.inputValue.trim()) {
      this.addChip();
    }
  }

  addChip(): void {
    const newChip = this.inputValue.trim();
    if (newChip && !this.chips.includes(newChip)) {
      this.chips.push(newChip);
      this.chipsChange.emit(this.chips);
    }
    this.inputValue = '';
  }

  removeChip(index: number): void {
    this.chips.splice(index, 1);
    this.chipsChange.emit(this.chips);
  }

  getLabelCharacters(): Array<{ char: string; index: number }> {
    return this.label.split('').map((char, i) => ({
      char,
      index: i >= 3 ? 3 : i,
    }));
  }
}
