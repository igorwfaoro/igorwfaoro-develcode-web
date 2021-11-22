import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../models/api/user';
import { UserOutput } from '../../../models/output/user.output';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';

export interface UserFormInputData {
  userId?: number;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public user: User;

  public userForm: FormGroup;

  public profileImageLoaded = {
    file: null,
    url: '',
  };

  private _removeProfileImage = false;

  @ViewChild('profileImageInput', { static: false }) public profileImageInput: ElementRef;

  private _verifyCodeSubject: Subject<string> = new Subject();

  constructor(
    private _loader: LoaderService,
    private _toast: ToastService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: UserFormInputData
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const userId = this.inputData.userId;

    if (userId)
      this.getUser(userId);

    this._verifyCodeSubject.pipe(
      debounceTime(500)
    ).subscribe(code => {
      this._userService.codeExists(code, this.user?.id).subscribe(exists => {
        this.userForm.get('code').setErrors(exists ? {
          alreadyExists: true,
          incorrect: true
        } : null);
      });
    });
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required)
    });
  }

  private getUser(id: number): void {
    this._loader.show();

    this._userService.getById(id).subscribe(response => {
      this._loader.dismiss();
      this.user = response;
      this.setFormValues();
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  private setFormValues(): void {
    this.userForm.get('code').setValue(this.user.code);
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('birthDate').setValue(moment.utc(this.user.birthDate).local().toDate());

    this.profileImageLoaded.url = this.user.profileImageUrl;
    this._removeProfileImage = false;
  }

  public save(): void {

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this._toast.open('Invalid form');
      throw new Error('Invalid form');
    }

    const user: UserOutput = {
      id: this.user?.id,
      code: this.userForm.get('code').value,
      name: this.userForm.get('name').value,
      birthDate: moment(this.userForm.get('birthDate').value).toISOString(),
      removeProfileImage: this._removeProfileImage
    };

    const saveObservable: Observable<User> = this.user
      ? this._userService.update(user, this.profileImageLoaded.file)
      : this._userService.create(user, this.profileImageLoaded.file);

    this._loader.show();
    saveObservable.subscribe(response => {
      this._loader.dismiss();
      this._toast.open('Saved successfully!', 'success');
      this._dialogRef.close();
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  public onImageSelected(event): void {

    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];

      this.imageToDataUrl(image).then(dataUrl => {
        this.profileImageLoaded.file = image;
        this.profileImageLoaded.url = dataUrl;
      });

      this.profileImageInput.nativeElement.value = null;
    }
  }

  private imageToDataUrl(image): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(<string>e.target['result']);
      }
      reader.readAsDataURL(image);
    });
  }

  public removeProfileImage(): void {
    this.profileImageLoaded.file = null;
    this.profileImageLoaded.url = null;

    this._removeProfileImage = true;
  }

  public verifyCode(): void {
    this._verifyCodeSubject.next(this.userForm.get('code').value);
  }
}
