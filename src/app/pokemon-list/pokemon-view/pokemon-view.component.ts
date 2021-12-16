import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Pokemon,
  PokemonStats,
} from 'src/app/services/pokemon-types/pokemon.type';
import { PokemonService } from 'src/app/services/pokemon.service';
import { GetPokemonType } from 'src/helpers/GetPokemonType';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss'],
})
export class PokemonViewComponent implements OnInit {
  pokemon!: Pokemon;
  STARS = {
    empty: '✰',
    full: '★',
  };
  MAX_STARTS = 3;
  fullStars!: string;
  emptyStars!: string;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private getType: GetPokemonType
  ) {}

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.params['name'];
    console.log(pokemonName);
    this.pokemonService
      .getPokemonByName(pokemonName)
      .subscribe((res: Pokemon) => {
        console.log(res);
        this.pokemon = { ...res };
        console.log('this', this.pokemon);
      });
  }

  getPokemonType(type: string): string | null {
    return this.getType.getPokemonType(type);
  }

  transcriptPokemonStats(stats: PokemonStats): string {
    const calculateMaxStars = Math.ceil(stats.base_stat / 3).toFixed();
    const maxFullStars = calculateMaxStars.charAt(0);
    const fullStars = this.STARS.full.repeat(parseInt(maxFullStars));
    const emptyStars = this.STARS.empty.repeat(
      this.MAX_STARTS - parseInt(maxFullStars)
    );
    return String(fullStars + emptyStars);
  }

  transcriptPokemonStatsName(statsName: string): string {
    switch (statsName) {
      case 'hp':
        return 'Health';
      case 'attack':
        return 'Attack';
      case 'defense':
        return 'Defense';
      case 'special-attack':
        return 'Special Attack';
      case 'special-defense':
        return 'Special Defense';
      case 'speed':
        return 'Speed';
      default:
        return '';
    }
  }

  generateRandomNumber(from: number, to: number): number {
    return Math.max(from, Math.ceil(Math.random() * to));
  }
}
