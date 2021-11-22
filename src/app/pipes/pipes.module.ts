import { NgModule } from '@angular/core';
import { MomentDatePipe } from './moment-date.pipe';
import { MomentCalendarPipe } from './moment-calendar.pipe';
import { MapPipe } from './map.pipe';
import { RoundPipe } from './round.pipe';
import { MomentFromNowPipe } from './moment-from-now.pipe';

@NgModule({
    declarations: [
        MomentDatePipe,
        MomentCalendarPipe,
        MapPipe,
        RoundPipe,
        MomentFromNowPipe
    ],
    exports: [
        MomentDatePipe,
        MomentCalendarPipe,
        MapPipe,
        RoundPipe,
        MomentFromNowPipe
    ]
})
export class PipesModule { }