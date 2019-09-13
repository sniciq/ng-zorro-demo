import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StaffService } from '../service/module/staff.service';
import { UtilService } from '../service/util.service';
import { SysService } from '../service/sys.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'comp-login',
    styles: [`
        .loginContainer {
            background-image: url(./assets/img/sc2.jpg);
            background-size: cover;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            align-items: flex-start;
        }
        .login-form {
            max-width: 350px;
            background-color: #FFF;
            padding: 20px;
            margin-top: 80px;
            
        }
        .login-form-forgot {
            float: right;
        }
        .login-form-button {
            width: 100%;
        }
    `],
    template: `
    <div class="loginContainer" nz-row nzType="flex" nzJustify="center" style="padding-right: 20px;">
        <form nz-form [formGroup]="loginForm" class="login-form" (ngSubmit)="onSubmit()">
            <div>
                <h1><strong>Ant Design of Angular</strong></h1>
            </div>
            <nz-form-item>
                <nz-form-control nzErrorTip="Please input your username!">
                <nz-input-group nzPrefixIcon="user">
                    <input type="text" nz-input formControlName="username" placeholder="Username" />
                </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-control nzErrorTip="Please input your Password!">
                <nz-input-group nzPrefixIcon="lock">
                    <input type="password" nz-input formControlName="password" placeholder="Password" />
                </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-control>
                <label nz-checkbox formControlName="remember">
                    <span>Remember me</span>
                </label>
                <a class="login-form-forgot" class="login-form-forgot">Forgot password</a>
                <button nz-button class="login-form-button" [nzType]="'primary'">Log in</button>
                Or
                <a>register now!</a>
                </nz-form-control>
            </nz-form-item>
        </form>
    </div>
    `
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sysService: SysService
        // private authenticationService: AuthenticationService,
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: [true]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.sysService.login(this.f.username.value, this.f.password.value).subscribe(data => {
            this.router.navigate(['home']);
        },error => {
            this.loading = false;
            console.log(error)
        });
    }
}