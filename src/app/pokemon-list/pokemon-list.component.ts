import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  EventEmitter,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import {
  filter,
  tap,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Pokemon } from '../services/pokemon-types/pokemon.type';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  @ViewChildren('PokemonElement', { read: ElementRef })
  PokemonElement: QueryList<ElementRef> = new QueryList<ElementRef>();

  pokemonsList$: Pokemon[] = [];
  pokemonsInfiniteScroll$: Pokemon[] = [];

  initialPokemonData$?: Subscription;
  infiniteScrollPokemonData$?: Subscription;
  queryListSub$?: Subscription;

  observer!: IntersectionObserver;

  constructor(public pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonData();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.queryListSub$ = this.PokemonElement.changes.subscribe(
      (elem: QueryList<ElementRef>) => {
        if (elem.last) this.observer.observe(elem.last.nativeElement);
      }
    );
  }

  loadPokemonData() {
    this.initialPokemonData$ = this.pokemonService.loadPokemons().subscribe({
      next: (pokemons: Pokemon[]) => {
        if (pokemons) {
          pokemons.forEach((pokemon: Pokemon) => {
            this.pokemonsList$.push(pokemon);
          });
        }
      },
    });
  }

  loadMorePokemons() {
    this.infiniteScrollPokemonData$ = this.pokemonService
      .infiniteLoadPokemons()
      .subscribe((pokemons: Pokemon[]) => {
        if (pokemons) {
          pokemons.forEach((pokemon: Pokemon) => {
            this.pokemonsList$.push(pokemon);
          });
        }
      });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      const isElement =
        entries[0].isIntersecting &&
        entries[0].target == this.PokemonElement.last.nativeElement;
      if (entries[0].isIntersecting && isElement) {
        this.loadMorePokemons();
      }
    }, options);
  }

  ngOnDestroy() {
    this.infiniteScrollPokemonData$?.unsubscribe();
    this.initialPokemonData$?.unsubscribe();
    this.queryListSub$?.unsubscribe();
    this.observer.disconnect();
  }
}
