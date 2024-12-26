import { Component, OnInit } from '@angular/core';
import {
  Notification,
  AtNotificationService,
} from './service/at-notification.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'authype-notification',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './at-notification.component.html',
  styleUrl: './at-notification.component.css',
})
export class AtNotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: AtNotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(
      (notifications) => (this.notifications = notifications)
    );
  }

  remove(notification: Notification) {
    this.notificationService.markAsExiting(notification);
  }

  handleAnimationEnd(event: AnimationEvent, notification: Notification) {
    if (notification.exiting) {
      this.notificationService.remove(notification);
    }
  }
}
