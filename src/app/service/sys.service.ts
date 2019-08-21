import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResult } from '../vo/JsonResult';
import { Menu } from '../vo/menu';

@Injectable()
export class SysService {
    constructor(
        private httpClient: HttpClient
    ) {}

    getMenu() {
        // return this.httpClient.get<JsonResult<Menu[]>>("/sys/menus");
        return this.httpClient.get<Menu[]>("/sys/menus");
    }
}