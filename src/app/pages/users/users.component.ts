import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/api/user';
import { UserFilter } from '../../models/output/filters/user.filter';
import { LoaderService } from '../../services/loader.service';
import { TitleService } from '../../services/title.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { UserFormComponent, UserFormInputData } from './user-form/user-form.component';

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
    'birthDate',
    'createdAt',
    'profileImage',
    'options'
  ];

  constructor(
    private _title: TitleService,
    private _loader: LoaderService,
    private _toast: ToastService,
    private _userService: UserService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._title.set('Users');
    this.getUsers();
  }

  private getUsers(options: {
    reset?: boolean;
    showLoader?: boolean;
  } = { showLoader: true }): Promise<void> {

    return new Promise((resolve, reject) => {

      if (options.showLoader)
        this._loader.show();

      this._userService.getAll(this.userFilter).subscribe(response => {

        if (options.showLoader)
          this._loader.dismiss();

        if (options.reset)
          this.users = [];

        this.users = this.users.concat(response);

        resolve();

      }, error => {

        if (options.showLoader)
          this._loader.dismiss();

        this._toast.showHttpError(error);

        reject();
      })
    });
  }

  public loadMore(): void {
    this.userFilter.index++;
    this.getUsers();
  }

  public search(query: string): void {
    this.userFilter.q = query;

    this.getUsers({ reset: true }).then(() => {
      this.userFilter.q = null
    });
  }

  public openForm(userId?: number): void {

    const data: UserFormInputData = { userId }

    const dialog = this._dialog.open(UserFormComponent, {
      data,
      width: '500px'
    });

    dialog.afterClosed().subscribe(() => this.getUsers({ reset: true, showLoader: false }));
  }
}
