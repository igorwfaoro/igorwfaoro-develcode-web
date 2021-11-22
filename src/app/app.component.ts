import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loaderState: boolean = false

  public toolbarMenus = [
    {
      title: 'Users',
      route: '/users'
    }
  ];

  constructor(
    public userService: UserService,
    private _loaderService: LoaderService,
    private _cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this._loaderService.loaderEmitter.subscribe(
      state => {
        this.loaderState = state;
        this._cdRef.detectChanges();
      }
    );
  }
}
