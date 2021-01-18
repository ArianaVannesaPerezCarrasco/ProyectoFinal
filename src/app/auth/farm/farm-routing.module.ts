import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmComponent } from './farm.component';

const routes: Routes = [{ path: '', component: FarmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
