'use client';

import { toast } from 'react-toastify';

export class Notification {
  public static success(message: string): void {
    toast.success(message);
  }

  public static error(message: string): void {
    toast.error(message);
  }

  public static info(message: string): void {
    toast.info(message);
  }
}
