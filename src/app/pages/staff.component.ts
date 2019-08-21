import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'comp-staff',
    styles: [`
        .search-form {
            border: 1px dashed #e9e9e9;
            background-color: #fafafa;
            padding: 6px 16px;
        }
        .search-result-list {
            margin-top: 16px;
            border: 1px dashed #e9e9e9;
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 50px;
            text-align: center;
            padding-top: 20px;
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
                            <nz-date-picker formControlName="date" (ngModelChange)="onDateChange($event)"></nz-date-picker>
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
                #basicTable 
                nzShowPagination
                nzShowSizeChanger
                (nzCurrentPageDataChange)="currentPageDataChange($event)"
                [nzData]="listOfData"
            >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let data of basicTable.data">
                    <td>{{ data.name }}</td>
                    <td>{{ data.age }}</td>
                    <td>{{ data.address }}</td>
                    <td>
                    <a>Action 一 {{ data.name }}</a>
                    <nz-divider nzType="vertical"></nz-divider>
                    <a>Delete</a>
                    </td>
                </tr>
                </tbody>
            </nz-table>
        </div>
    `
})

export class StaffComponent implements OnInit {
    validateForm: FormGroup;

    listOfData = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null, [Validators.required]],
            name: [null, []],
            age: [null, []],
            date: [new Date(), []],
            remember: [true]
        });
    }

    onDateChange(result: Date): void {
        console.log('onChange: ', result);
    }
    resetForm(): void {
        this.validateForm.reset();
    }
    submitForm(): void {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    currentPageDataChange($event: any[]): void {
        this.listOfData = $event;
        // this.refreshStatus();
    }
    

}