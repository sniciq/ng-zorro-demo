import { Component, OnInit } from '@angular/core';
import { SysService } from './service/sys.service';
import { Menu } from './vo/menu';
import { User } from './vo/user';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  menus: Menu[];
  confirmModal: NzModalRef;
  currentUser: User;

  constructor(
    private sysService: SysService,
    private modal: NzModalService,
    private router: Router
  ) {

    this.sysService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
    this.sysService.getMenu().subscribe(data => {
      this.menus = data;
    });
  }

  logout(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '确认',
      nzContent: '确认退出?',
      nzOnOk: () => {
          this.sysService.logout();
          this.router.navigate(['login']);
      }
    });
  }
}
