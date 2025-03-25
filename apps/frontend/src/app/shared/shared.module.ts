import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DevFormComponent } from './dev-form/dev-form.component';
import { DevListComponent } from './dev-list/dev-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HeaderComponent,
    DevFormComponent,
    DevListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    DevFormComponent,
    DevListComponent
  ]
})
export class SharedModule { }
