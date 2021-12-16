import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { GetPokemonType } from '../../helpers/GetPokemonType';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [PokemonListComponent],
  providers: [PokemonService, HttpClient, GetPokemonType]
})
export class PokemonListModule { }
