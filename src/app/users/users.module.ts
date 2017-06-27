import { DivFieldErrorComponent } from './../shared/div-field-error/div-field-error.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    UsersRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    AlertModule.forRoot()
  ],
  declarations: [UsersComponent, DivFieldErrorComponent]
})
export class UsersModule { }
