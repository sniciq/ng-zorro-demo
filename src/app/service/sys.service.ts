import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResult } from '../vo/JsonResult';
import { Menu } from '../vo/menu';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../vo/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SysService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private httpClient: HttpClient
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getUserInfo() {
        this.httpClient.get<JsonResult<string>>("/sys/userInfo").subscribe(data => {
            if(data.success) {
                const user = new User();
                user.username = data.data;
                this.currentUserSubject.next(user);
            }
            else {
                throw new Error("用户名或者密码错误！");
            }
        })
    }

    getMenu() {
        return this.httpClient.get<Menu[]>("/sys/menus");
    }

    login(username: string, password: string) {
        return this.httpClient.post<JsonResult<any[]>>("/sys/login", {username:username,password:password}).pipe(map(data => {
            if(data.success) {
                return this.getUserInfo();
            }
            else {
                throw new Error("用户名或者密码错误！");
            }
        }))
    }
    logout() {
        this.httpClient.get<JsonResult<any>>("/sys/logout").subscribe(data => {
            this.currentUserSubject.next(null);
        });
    }
}