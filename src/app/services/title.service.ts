import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable()
export class TitleService {

    constructor(
        private _title: Title
    ) { }

    public set(newTitle?: string): void {
        this._title.setTitle(`${newTitle ? newTitle + ' | ' : ''}IWF Develcode Web`);
    }
}