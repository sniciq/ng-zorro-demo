import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class UtilService {

    constructor(
        private notification: NzNotificationService
    ) {}

    /**
     * 
     * @param type 'success'、'info'、'warning'、'error'
     * @param title 
     * @param info 
     */
    notice(type: string, title: string, info: string): void {
        this.notification.create(type, title, info);
    }
}