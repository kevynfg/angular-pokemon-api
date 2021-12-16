import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../services/pokemon-types/pokemon.type';
import { GetPokemonType } from '../../helpers/GetPokemonType';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon!: Pokemon;

  constructor(private getType: GetPokemonType) {}

  ngOnInit(): void {}

  getPokemonType(type: string): string | null {
    return this.getType.getPokemonType(type);
  }
}
