import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResult } from '../../vo/JsonResult';

@Injectable()
export class StaffService {
    constructor(
        private httpClient: HttpClient
    ) {}

    search(param: any) {
        return this.httpClient.post<JsonResult<any[]>>("/admin/StaffCtrl/search", param);
    }
}