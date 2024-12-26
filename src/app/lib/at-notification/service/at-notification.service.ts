import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number; // En milisegundos
  exiting?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AtNotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  add(notification: Notification): void {
    const notificationWithDefaults = { ...notification, exiting: false };
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([
      ...currentNotifications,
      notificationWithDefaults,
    ]);

    setTimeout(
      () => this.markAsExiting(notificationWithDefaults),
      notificationWithDefaults.duration ?? 3000
    );
  }

  markAsExiting(notification: Notification): void {
    const currentNotifications = this.notificationsSubject.getValue();
    const updatedNotifications = currentNotifications.map((n) =>
      n === notification ? { ...n, exiting: true } : n
    );
    this.notificationsSubject.next(updatedNotifications);
  }

  remove(notification: Notification): void {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next(
      currentNotifications.filter((n) => n !== notification)
    );
  }
}
