import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from './urls';
import { HttpQueryParamsHelper } from '../helpers/filter-helper';
import { User } from '../models/api/user';
import { UserFilter } from '../models/output/filters/user.filter';
import { UserOutput } from '../models/output/user.output';

@Injectable()
export class UserService {

    constructor(
        private _http: HttpClient
    ) { }

    public getAll(filter: UserFilter): Observable<User[]> {
        return this._http.get<User[]>(`${URLS.api.users}`, {
            params: HttpQueryParamsHelper.objectToParams(filter)
        });
    }

    public getById(id: number): Observable<User> {
        return this._http.get<User>(`${URLS.api.users}/${id}`);
    }

    public create(body: UserOutput): Observable<User> {
        return this._http.post<User>(`${URLS.api.users}`, body);
    }

    public update(body: UserOutput): Observable<User> {
        return this._http.put<User>(`${URLS.api.users}`, body);
    }

    public delete(id: number): Observable<void> {
        return this._http.delete<void>(`${URLS.api.users}/${id}`);
    }
}