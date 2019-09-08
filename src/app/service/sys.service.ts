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
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getMenu() {
        // return this.httpClient.get<JsonResult<Menu[]>>("/sys/menus");
        return this.httpClient.get<Menu[]>("/sys/menus");
    }

    login(username: string, password: string) {
        return this.httpClient.get<Menu[]>("/sys/menus").pipe(map(data => {
            var user = new User();
            user.id = 1;
            user.username = 'hello';
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}