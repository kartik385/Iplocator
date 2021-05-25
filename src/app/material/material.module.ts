import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

const materials=[
  MatCardModule
]

@NgModule({
  
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
