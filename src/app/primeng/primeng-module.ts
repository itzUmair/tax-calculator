import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {SelectModule} from 'primeng/select';


@NgModule({
  declarations: [],
  imports: [InputTextModule, FloatLabelModule, InputNumberModule, ButtonModule, SelectModule],
  exports: [InputTextModule, FloatLabelModule, InputNumberModule, ButtonModule, SelectModule],
})
export class PrimengModule { }
