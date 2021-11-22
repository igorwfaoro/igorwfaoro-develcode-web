import { Component, OnInit } from '@angular/core';
import { User } from '../../models/api/user';
import { UserFilter } from '../../models/output/filters/user.filter';
import { LoaderService } from '../../services/loader.service';
import { TitleService } from '../../services/title.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

public users: User[] = [];

  public userFilter: UserFilter = {
    index: 0,
    limit: 20
  }

  public tableColumns = [
    'id',
    'code',
    'name',
    'birthday',
    'createdAt',
    'profileImage'
  ];

  constructor(
    private _title: TitleService,
    private _loader: LoaderService,
    private _toast: ToastService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._title.set('Users');
    this.getUsers();
  }

  private getUsers(reset: boolean = false, cb?: () => void): void {
    this._loader.show();

    this._userService.getAll(this.userFilter).subscribe(response => {
      this._loader.dismiss();

      if (reset)
        this.users = [];

      this.users = this.users.concat(response);
      
      if (cb) cb();

    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    })
  }

  public loadMore(): void {
    this.userFilter.index++;
    this.getUsers();
  }

  public search(query: string): void {
    this.userFilter.q = query;
    this.getUsers(true, () => {
      this.userFilter.q = null;
    });
  }
}
