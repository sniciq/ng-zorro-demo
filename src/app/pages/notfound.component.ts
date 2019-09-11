import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'comp-notfound',
    styleUrls: [],
    template: `
        <nz-card [nzBordered]="false" nzTitle="404">
            <p>页面未找到~</p>
        </nz-card>
    `
})

export class NotFoundComponent implements OnInit {

    ngOnInit(): void {
    }

}