import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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
      width="200"
      height="200"
      class="hue-selector"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
    ></canvas>
  `,
  styles: [
    `
      .hue-selector:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class AtHueSelectorComponent implements AfterViewInit, OnChanges {
  @ViewChild('hueCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() hue: string = 'rgba(255,255,255,1)';
  @Output() color: EventEmitter<string> = new EventEmitter(true);

  private ctx!: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  public selectedPosition!: { x: number; y: number };
  private isViewInitializaed = false;

  ngAfterViewInit() {
    this.isViewInitializaed = true;
    this.draw();
  }

  draw() {
    if (!this.isViewInitializaed || !this.canvas) {
      return;
    }
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d', {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    this.ctx.fillStyle = this.hue || 'rgba(255,255,255,1)';
    this.ctx.fillRect(0, 0, width, height);

    const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(0, 0, width, height);

    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(0, 0, width, height);

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(
        this.selectedPosition.x,
        this.selectedPosition.y,
        7,
        0,
        2 * Math.PI
      );
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue']) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y));
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
    this.draw();
    this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY));
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return (
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    );
  }
}
