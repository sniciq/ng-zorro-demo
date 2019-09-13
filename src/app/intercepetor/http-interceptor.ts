import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpResponseBase
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { JsonResult } from '../vo/JsonResult';
import { Router} from '@angular/router';

@Injectable()
export class SysHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({setHeaders: {'Request-By': 'AgHttp'}});
    return next.handle(req).pipe(map((data: HttpEvent<any>) => {
      if (data instanceof HttpResponseBase) {
        const rp = <HttpResponse<JsonResult<any>>> data;
        if(rp.body.result && rp.body.result == 'timeout') {
          this.router.navigate(['/login']);
          return null;
        };
      }
      return data;
    }));
  }
}