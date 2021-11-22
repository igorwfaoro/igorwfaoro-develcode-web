import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from './urls';
import { HttpQueryParamsHelper } from '../helpers/filter-helper';
import { User } from '../models/api/user';
import { UserFilter } from '../models/output/filters/user.filter';
import { UserOutput } from '../models/output/user.output';
import { map } from 'rxjs/operators';

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

    public create(body: UserOutput, profileImageFile: any): Observable<User> {
        const data = new FormData();

        if (profileImageFile)
            data.append('profileImage', profileImageFile);

        data.append('data', JSON.stringify(body));

        return this._http.post<User>(`${URLS.api.users}`, data);
    }

    public update(body: UserOutput, profileImageFile: any): Observable<User> {
        const data = new FormData();

        if (profileImageFile)
            data.append('profileImage', profileImageFile);

        data.append('data', JSON.stringify(body));

        return this._http.put<User>(`${URLS.api.users}`, data);
    }

    public delete(id: number): Observable<void> {
        return this._http.delete<void>(`${URLS.api.users}/${id}`);
    }

    public codeExists(code: string, userId?: number): Observable<boolean> {
        return this._http
            .get<{ exists: boolean }>(`${URLS.api.users}/codeExists/${code}`, {
                params: { userId }
            }).pipe(map(res => res.exists));
    }
}