import { NgIf } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'authype-fileinput',
  standalone: true,
  imports: [NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtFileinputComponent),
      multi: true,
    },
  ],
  templateUrl: './at-fileinput.component.html',
  styleUrl: './at-fileinput.component.css',
})
export class AtFileinputComponent implements OnChanges, ControlValueAccessor {
  @Input() control: FormControl | null = null; // FormControl que viene del padre
  @Input() imageURL: string | null = null; // URL de la imagen precargada

  file: File | null = null;
  fileURL: string | null = null;
  fileType: string | null = null;

  // Métodos de ControlValueAccessor
  private onChange: (value: File | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageURL'] && changes['imageURL'].currentValue) {
      // Si se recibe una nueva URL, actualizar la vista previa
      this.fileURL = changes['imageURL'].currentValue;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onPaste(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (items) {
      Array.from(items).forEach((item) => {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            this.handleFile(file);
          }
        }
      });
    }
  }

  handleFile(file: File): void {
    this.file = file;
    this.fileType = file.type;

    if (this.control) {
      this.control.setValue(file); // Setea el archivo en el FormControl
    }

    if (this.fileType.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileURL = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileURL = null;
    }

    this.onChange(file);
  }

  removeFile(): void {
    this.file = null;
    this.fileURL = null;
    this.imageURL = null; // Regresa a la URL original si existe
    this.onChange(null);
  }

  writeValue(value: File | null): void {
    this.file = value;
    this.fileURL = this.imageURL || null;
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
