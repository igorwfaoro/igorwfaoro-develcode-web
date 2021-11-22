import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/api/user';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

export interface UserDetailsInputData {
  userId: number;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  constructor(
    private _loader: LoaderService,
    private _toast: ToastService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public inputData: UserDetailsInputData
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this._loader.show();
    this._userService.getById(this.inputData.userId).subscribe(response => {
      this._loader.dismiss();
      this.user = response;
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

}
