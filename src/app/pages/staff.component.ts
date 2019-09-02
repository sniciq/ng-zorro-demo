import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StaffService } from '../service/module/staff.service';
import { UtilService } from '../service/util.service';
import * as moment from 'moment';

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
        .search-form nz-form-control {
            width:100%;
        }
    `],
    template: `
        <nz-modal
            [(nzVisible)]="showModal"
            nzTitle="Modal Title"
            nzWidth="700"
            (nzOnCancel)="modalCancel()"
            (nzOnOk)="onSave()"
            [nzCancelLoading]="modalOkLoading"
            [nzOkLoading]="modalOkLoading"
        >
        <nz-spin [nzSpinning]="modalOkLoading">
            <form nz-form [formGroup]="editForm">
                <input type="hidden" formControlName="id" id="id" />
                <nz-form-item>
                    <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="name">name</nz-form-label>
                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="必填!">
                        <input nz-input formControlName="name" id="name" />
                    </nz-form-control>
                </nz-form-item>
                <nz-form-item>
                    <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="age">age</nz-form-label>
                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="必填!">
                        <input nz-input formControlName="age" id="age" />
                    </nz-form-control>
                </nz-form-item>
                <nz-form-item>
                    <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="birthday">birthday</nz-form-label>
                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="必填!">
                        <nz-date-picker formControlName="birthday"></nz-date-picker>
                    </nz-form-control>
                </nz-form-item>
            </form>
        </nz-spin>
        </nz-modal>
        <form class="search-form" nz-form [formGroup]="searchForm" (ngSubmit)="onSearch()">
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
                            <nz-date-picker formControlName="birthday"></nz-date-picker>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div nz-col [nzSpan]="16" >
                    <div nz-row nzType="flex" nzJustify="end">
                        <button nz-button [nzType]="'primary'" (click)="add()">新增</button>
                        <button nz-button [nzType]="'primary'">查询</button>
                        <button nz-button (click)="resetForm()">清空</button>
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
                    <th>birthday</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let data of listOfData">
                    <td>{{ data.id }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.age }}</td>
                    <td>{{ data.birthday }}</td>
                    <td>
                        <a (click)="onEdit(data.id)">编辑</a>
                        <nz-divider nzType="vertical"></nz-divider>
                        <a (click)="onDelete(data)">删除</a>
                    </td>
                </tr>
                </tbody>
            </nz-table>
        </div>
    `
})

export class StaffComponent implements OnInit {

    //编辑
    showModal = false;
    modalOkLoading = false;
    editForm: FormGroup;
    confirmModal: NzModalRef;

    //查询
    searchForm: FormGroup;
    listOfData = [];
    loading = false;
    pagination = {
        pageNo: 1, limit: 10,total: 0,
        sort: null,dir: null
    };

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private utilService: UtilService,
        private modal: NzModalService
    ) {}

    ngOnInit(): void {
        this.editForm = this.fb.group({
            id: [null, []],
            name: [null, [Validators.required]],
            age: [null, [Validators.required]],
            birthday: [null, [Validators.required]],
        });
        this.searchForm = this.fb.group({
            id: [null, [Validators.required]],
            name: [null, []],
            age: [null, []],
            birthday: [null, []],
            remember: [true]
        });
        this.searchData(true);
    }
    resetForm(): void {
        this.searchForm.reset();
    }
    onSearch(): void {
        // for (const i in this.searchForm.controls) {
        //   this.searchForm.controls[i].markAsDirty();
        //   this.searchForm.controls[i].updateValueAndValidity();
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
        var data = Object.assign({}, this.searchForm.value)
        for(var p in data) {
            if(data[p] instanceof Date) {
                var d = moment(data[p]).format('YYYY-MM-DD');
                data[p] = d;
            }
        }

        this.loading = true;
        this.staffService.search({data: data, extLimit:this.pagination, }).subscribe(data => {
            this.listOfData = data.data;
            this.pagination.total = data.total;
            this.loading = false;
        })
    }
    add(): void {
        this.editForm.reset();
        this.showModal = true;
    }
    modalCancel(): void {
        this.showModal = false;
        this.editForm.reset();
    }
    onEdit(id: number): void {
        this.staffService.getDetailInfo(id).subscribe(data => {
            if(!data.success) {
                this.utilService.notice('error', '提示', data.info);
                return;
            }

            this.editForm.reset();
            this.editForm.patchValue(data.data);
            this.showModal = true;
        })
    }
    onDelete(data: Object): void {
        this.confirmModal = this.modal.confirm({
            nzTitle: '确认',
            nzContent: '确认删除记录【' + data['id'] + '】?',
            nzOnOk: () => this.staffService.delete(data['id']).subscribe(data => {
                if(!data.success) {
                    this.utilService.notice('error', '提示', data.info);
                }
                else {
                    this.utilService.notice('success', '提示', '操作成功！');
                    this.searchData();
                }
            })
        });
    }
    onSave(): void {
        for (const i in this.editForm.controls) {
          this.editForm.controls[i].markAsDirty();
          this.editForm.controls[i].updateValueAndValidity();
        }

        if(!this.editForm.valid) {
            return;
        }

        this.modalOkLoading = true;

        //日期格式，utc
        var data = Object.assign({}, this.editForm.value)
        for(var p in data) {
            if(data[p] instanceof Date) {
                var d = moment(data[p]).format('YYYY-MM-DD');
                data[p] = d;
            }
        }

        this.staffService.save(data).subscribe(data => {
            this.modalOkLoading = false;
            if(!data.success) {
                this.utilService.notice('error', '提示',data.info);
                return;
            }
            else {
                this.utilService.notice('success', '提示', '操作成功！');
                this.showModal = false;
                this.searchData();
            }
        });

    }
}