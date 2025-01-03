import { Component, EventEmitter, Output } from '@angular/core';
import { AtHueSelectorComponent } from './at-hue-selector/at-hue-selector.component';
import { AtSpectrumSelectorComponent } from './at-spectrum-selector/at-spectrum-selector.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'authype-colorpicker',
  standalone: true,
  imports: [FormsModule, AtHueSelectorComponent, AtSpectrumSelectorComponent],
  templateUrl: './at-colorpicker.component.html',
  styleUrl: './at-colorpicker.component.css',
})
export class AtColorpickerComponent {
  public hue: string = 'rgba(255, 255, 255, 1)';
  public color: string = 'rgba(255, 255, 255, 1)';
  rgb = { r: 255, g: 255, b: 255 };
  hex: string = '#ffffff';
  public isPickerVisible: boolean = false;

  @Output() colorSelected = new EventEmitter<
    string | { r: number; g: number; b: number }
  >();

  togglePickerVisibility(): void {
    this.isPickerVisible = !this.isPickerVisible;
  }

  onHueChange(newHue: string) {
    this.hue = newHue;
  }
  onColorChange(newColor: string) {
    this.color = newColor;
    this.updateSelectedColor();
  }

  updateColorFromRGB(): void {
    this.color = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, 1)`;
    // this.hue = this.color;
    this.updateSelectedColor();
  }
  updateColorFromHEX(): void {
    const rgb = this.hexToRgb(this.hex);
    if (rgb) {
      this.color = `rgba(${rgb.r},${rgb.g},${rgb.b}, 1)`;
      // this.hue = `rgba(${rgb.r},${rgb.g},${rgb.b}, 1)`;
      this.updateSelectedColor();
    }
  }

  // Convert HEX to RGB
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
      return null; // HEX inválido
    }
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
      ? {
          r: parseInt(match[1], 16),
          g: parseInt(match[2], 16),
          b: parseInt(match[3], 16),
        }
      : null;
  }

  private updateSelectedColor(): void {
    const arrayColorRGB = this.color.replace(/[()\[a-z\]]/g, '').split(',', 3);
    const r = parseInt(arrayColorRGB[0]);
    const g = parseInt(arrayColorRGB[1]);
    const b = parseInt(arrayColorRGB[2]);
    this.rgb = {
      r: r,
      g: g,
      b: b,
    };
    this.hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
    this.colorSelected.emit(this.hex);
  }
}
