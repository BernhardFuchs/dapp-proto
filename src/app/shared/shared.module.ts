import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtherPipe } from './pipes';

@NgModule({
  declarations: [
    EtherPipe
  ],
  exports: [
    EtherPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
