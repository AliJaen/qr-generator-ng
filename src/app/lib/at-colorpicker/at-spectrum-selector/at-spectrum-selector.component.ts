import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'at-spectrumSelector',
  standalone: true,
  imports: [],
  template: `
    <canvas
      #spectrumCanvas
      class="spectrum-selector"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
    ></canvas>
  `,
  styles: [
    `
      .spectrum-selector {
        width: 30px;
        height: 200px;
        cursor: pointer;
      }
    `,
  ],
})
export class AtSpectrumSelectorComponent implements AfterViewInit, OnChanges {
  @ViewChild('spectrumCanvas') spectrumCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() huePosition = { y: 0 };
  @Input() currentHue = 'rgb(255, 0, 0)';

  @Output() hueChange = new EventEmitter<string>();

  private isDragging = false;

  ngAfterViewInit(): void {
    this.drawSpectrum();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentHue']) {
      this.drawSpectrum();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.updateSpectrum(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.updateSpectrum(event);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  private drawSpectrum() {
    const canvas = this.spectrumCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.16, 'orange');
    gradient.addColorStop(0.33, 'yellow');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(0.66, 'blue');
    gradient.addColorStop(0.83, 'indigo');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const lineY = this.huePosition.y;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(canvas.width, lineY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.currentHue;
    ctx.stroke();
  }

  private updateSpectrum(event: MouseEvent) {
    const canvas = this.spectrumCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    this.huePosition.y = y;

    const hue = Math.round((y / rect.height) * 360);
    this.hueChange.emit(`hsl(${hue}, 100%, 50%)`);
  }
}
