import { Component, OnInit } from '@angular/core';
import { SysService } from './service/sys.service';
import { Menu } from './vo/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private sysService: SysService
  ) {}

  isCollapsed = false;
  menus: Menu[];



  ngOnInit(): void {
    this.sysService.getMenu().subscribe(data => {
      this.menus = data;
    });
  }

}
