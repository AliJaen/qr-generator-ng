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
  selectedColor: string = '#ffffff';
  rgb = { r: 255, g: 255, b: 255 };
  hex: string = '#ffffff';

  huePosition = { y: 0 };
  spectrumPosition = { x: 0, y: 0 };

  currentHue = 'rgb(255, 0, 0)';
  rgbValue = '';
  hexValue = '';

  @Output() colorSelected = new EventEmitter<string>();

  onHueChange(newHue: string) {
    this.currentHue = newHue;
    this.spectrumPosition = {
      x: this.spectrumPosition.x,
      y: this.huePosition.y,
    };
  }

  onColorChange(color: {
    rgb: string;
    hex: string;
    position: { x: number; y: number };
  }) {
    this.rgbValue = color.rgb;
    this.hexValue = color.hex;
    this.spectrumPosition = color.position;
    this.selectedColor = color.hex;
    this.colorSelected.emit(color.hex);
  }
}
