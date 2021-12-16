import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonListModule } from '../pokemon-list/pokemon-list.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonListModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ])
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
