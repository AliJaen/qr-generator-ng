import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'authype-carousel',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './at-carousel.component.html',
  styleUrl: './at-carousel.component.css',
})
export class AtCarouselComponent implements OnInit, OnDestroy {
  @Input() images: { src: string; alt: string }[] = [];
  currentIndex: number = 0;

  private autoSlideInterval: any;
  private autoSlideDelay: number = 5000;

  ngOnInit(): void {
    this.startAutoSlide();
  }
  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  next(): void {
    this.resetAutoSlide();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  goTo(index: number): void {
    this.resetAutoSlide();
    this.currentIndex = index;
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, this.autoSlideDelay);
  }
  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
