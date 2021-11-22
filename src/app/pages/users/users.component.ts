import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/api/user';
import { UserFilter } from '../../models/output/filters/user.filter';
import { DialogMessageOptions } from '../../models/ui/dialog-message-options';
import { LoaderService } from '../../services/loader.service';
import { TitleService } from '../../services/title.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { DialogMessageComponent } from '../../shared/dialog-message/dialog-message.component';
import { UserDetailsComponent, UserDetailsInputData } from './user-details/user-details.component';
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
    'profileImage',
    'actions'
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

        if (options.reset) {
          this.users = [];
          this.userFilter.index = 0;
        }

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

  public openDetails(userId: number): void {

    const data: UserDetailsInputData = { userId }

    this._dialog.open(UserDetailsComponent, {
      data,
      width: '500px'
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

  public deleteUser(user: User): void {

    const data: DialogMessageOptions = {
      message: `Are you sure you want to delete the "${user.name}"?`,
      title: 'Delete',
      buttons: [
        {
          text: 'No',
          closeOnClick: true
        },
        {
          text: 'Yes',
          color: 'warn',
          onClick: () => {
            this._loader.show();
            this._userService.delete(user.id).subscribe(response => {
              this._loader.dismiss();
              this._toast.open('Deleted successfully!');
              this.getUsers({ reset: true, showLoader: false });
            }, error => {
              this._loader.dismiss();
              this._toast.showHttpError(error);
            });
          }
        }
      ]
    }

    this._dialog.open(DialogMessageComponent, { data });
  }
}
