import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../service/module/staff.service';
@Component({
    selector: 'comp-staff',
    styles: [`
        .search-form {
            border: 1px solid #fafafa;
            background-color: #fafafa;
            padding: 6px 16px;
        }
        .search-result-list {
            margin-top: 16px;
            // border: 1px dashed #e9e9e9;
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 50px;
            text-align: center;
            padding-top: 0px;
        }
        button {
            margin-left: 8px;
        }
        nz-form-item {
            margin-bottom: 8px;
        }
        nz-form-control {
            width:100%;
        }
    `],
    template: `
        <form class="search-form" nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
            <div nz-row [nzGutter]="24">
                <div nz-col [nzSpan]="8">
                    <nz-form-item nzFlex>
                        <nz-form-label >ID</nz-form-label>
                        <nz-form-control>
                            <input formControlName="id" nz-input placeholder="id" />
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div nz-col [nzSpan]="8">
                    <nz-form-item nzFlex>
                        <nz-form-label >Name</nz-form-label>
                        <nz-form-control>
                            <input formControlName="name" nz-input placeholder="Name" />
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div nz-col [nzSpan]="8">
                    <nz-form-item nzFlex>
                        <nz-form-label >age</nz-form-label>
                        <nz-form-control>
                            <input formControlName="age" nz-input placeholder="Age" />
                        </nz-form-control>
                    </nz-form-item>
                </div>
            </div>
            <div nz-row [nzGutter]="24">
                <div nz-col [nzSpan]="8">
                    <nz-form-item nzFlex>
                        <nz-form-label >生日</nz-form-label>
                        <nz-form-control>
                            <nz-date-picker formControlName="birthday" (ngModelChange)="onDateChange($event)"></nz-date-picker>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div nz-col [nzSpan]="16" >
                    <div nz-row nzType="flex" nzJustify="end">
                        <button nz-button [nzType]="'primary'">Search</button>
                        <button nz-button (click)="resetForm()">Clear</button>
                    </div>
                </div>
            </div>
        </form>
        <div class="search-result-list">
            <nz-table 
                nzSize="middle"
                nzShowSizeChanger
                [nzFrontPagination]="false"
                [nzData]="listOfData"
                [nzLoading]="loading"
                [nzTotal]="pagination.total"
                [(nzPageIndex)]="pagination.pageNo"
                [(nzPageSize)]="pagination.limit"
                (nzPageIndexChange)="searchData()"
                (nzPageSizeChange)="searchData(true)"
            >
                <thead (nzSortChange)="sortData($event)" nzSingleSort>
                <tr>
                    <th nzShowSort nzSortKey="id">ID</th>
                    <th nzShowSort nzSortKey="name">Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let data of listOfData">
                    <td>{{ data.id }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.age }}</td>
                    <td>{{ data.address }}</td>
                    <td>
                        <a>编辑</a>
                        <nz-divider nzType="vertical"></nz-divider>
                        <a>删除</a>
                    </td>
                </tr>
                </tbody>
            </nz-table>
        </div>
    `
})

export class StaffComponent implements OnInit {
    validateForm: FormGroup;
    listOfData = [];
    loading = false;
    pagination = {
        pageNo: 1, limit: 10,total: 0,
        sort: null,dir: null
    };

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null, [Validators.required]],
            name: [null, []],
            age: [null, []],
            birthday: [null, []],
            remember: [true]
        });
        this.searchData(true);
    }

    onDateChange(result: Date): void {
        console.log('onChange: ', result);
    }
    resetForm(): void {
        this.validateForm.reset();
    }
    submitForm(): void {
        // for (const i in this.validateForm.controls) {
        //   this.validateForm.controls[i].markAsDirty();
        //   this.validateForm.controls[i].updateValueAndValidity();
        // }
        this.searchData(true);
    }
    sortData(sort: {key: string, value:string}): void {
        this.pagination.sort = sort.key;
        if(sort.value == 'descend') {
            this.pagination.dir = "DESC";
        }
        else if(sort.value == 'ascend') {
            this.pagination.dir = "ASC";
        }
        this.searchData();
    }
    searchData(reset: boolean = false) : void {
        if(reset == true) {
            this.pagination.pageNo = 1;
        }


        //日期格式，utc

        this.loading = true;
        this.staffService.search({data: this.validateForm.value, extLimit:this.pagination, }).subscribe(data => {
            this.listOfData = data.data;
            this.pagination.total = data.total;
            this.loading = false;
        })
    }
}