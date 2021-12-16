import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonService } from '../../services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { GetPokemonType } from '../../../helpers/GetPokemonType';
import { RouterModule } from '@angular/router';
import { PokemonViewComponent } from './pokemon-view.component';

@NgModule({
  declarations: [PokemonViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':name',
        component: PokemonViewComponent,
        pathMatch: 'full'
      }
    ])
  ],
  exports: [PokemonViewComponent],
  providers: [PokemonService, HttpClient, GetPokemonType]
})
export class PokemonViewModule { }
