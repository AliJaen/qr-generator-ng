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
  selector: 'at-hueSelector',
  standalone: true,
  imports: [],
  template: `
    <canvas
      #hueCanvas
      class="hue-selector"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
    ></canvas>
  `,
  styles: [
    `
      .hue-selector {
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
    `,
  ],
})
export class AtHueSelectorComponent implements AfterViewInit, OnChanges {
  @ViewChild('hueCanvas') hueCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() spectrumPosition = { x: 0, y: 0 };
  @Input() selectedHue: string = 'red';
  @Output() colorChange = new EventEmitter<{
    rgb: string;
    hex: string;
    position: { x: number; y: number };
  }>();

  private isDragging = false;

  ngAfterViewInit(): void {
    this.drawHueGradient();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedHue']) {
      this.drawHueGradient();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.updateHue(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.updateHue(event);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  private drawHueGradient() {
    const canvas = this.hueCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with the selected hue
    ctx.fillStyle = this.selectedHue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add white-to-transparent gradient
    const whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add black-to-transparent gradient
    const blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(
      this.spectrumPosition.x,
      this.spectrumPosition.y,
      5,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  private updateHue(event: MouseEvent) {
    const canvas = this.hueCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.spectrumPosition = { x, y };

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
      const hex = `#${imageData[0].toString(16).padStart(2, '0')}${imageData[1]
        .toString(16)
        .padStart(2, '0')}${imageData[2].toString(16).padStart(2, '0')}`;
      this.colorChange.emit({ rgb, hex, position: { x, y } });
    }
  }
}
