import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UsersRoutingModule } from './users.routing';
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }