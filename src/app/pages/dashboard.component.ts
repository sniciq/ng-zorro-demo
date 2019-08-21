import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'comp-dashboard',
    styleUrls: [],
    template: `
        <nz-card [nzBordered]="false" nzTitle="项目说明">
            <p>使用到的JS框架及相关文档如下：</p>
            <p>angular：<a target="_blank" href="https://www.angular.cn">https://www.angular.cn</a></p>
            <p>angular ant design：<a target="_blank" href="https://ng.ant.design">https://ng.ant.design</a></p>
        </nz-card>
    `
})

export class DashboardComponent implements OnInit {

    ngOnInit(): void {
    }

}