import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { CommonModule } from '@angular/common';
import { ButtonDialogCloseComponent } from './button-dialog-close/button-dialog-close.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DialogMessageComponent,
        ButtonDialogCloseComponent,
    ],
    imports: [
        AngularMaterialModule,
        PipesModule,
        CommonModule,
        NgxMaskModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        DialogMessageComponent,
        ButtonDialogCloseComponent,
        NgxMaskModule
    ],
    entryComponents: [
        DialogMessageComponent
    ]
})
export class SharedModule { }