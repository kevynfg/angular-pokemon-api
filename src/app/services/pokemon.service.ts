import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, from, merge, Observable, ReplaySubject } from 'rxjs';
import { PokemonSearch } from './pokemon-types/pokemon-search.type';
import { PokemonUrl } from './pokemon-types/pokemon-search.type';
import { Pokemon } from './pokemon-types/pokemon.type';
import { filter, map, mergeAll, mergeMap, scan, shareReplay, switchMap, take, tap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
  getByNameUrl = "https://pokeapi.co/api/v2/pokemon";
  nextPage: string = '';

  constructor(private httpClient: HttpClient) {
  };

  loadPokemons(): Observable<Pokemon[]> {
    console.time('Load Pokemons')
    return this.httpClient.get<PokemonSearch>(this.baseUrl).pipe(
      filter(data => Boolean(data)),
      map((searchData: PokemonSearch) => {
        this.nextPage = searchData.next
        return searchData.results
      }),
      mergeMap(dataResults => {
        return dataResults.map(res => {
          return this.httpClient.get<Pokemon>(res.url)
        })
      }),
      mergeAll(),
      toArray(),
      tap(() => console.timeEnd('Load Pokemons'))
    )
    // return this.httpClient.get<PokemonSearch>(this.baseUrl).pipe(
    //   map((searchData: PokemonSearch) => {
    //     this.nextPage = searchData?.next
    //     return searchData.results
    //   }),
    //   switchMap((dataResult: PokemonUrl[]) => {
    //     return dataResult.map(pokemon => {
    //       return this.httpClient.get<Pokemon>(pokemon.url)
    //     })
    //   }),
    //   mergeMap(result => result),
    //   toArray(),
    //   shareReplay(1),
    //   catchError((error) => {
    //     console.error(error);
    //     return EMPTY;
    //   })
    // )
  };

  infiniteLoadPokemons(): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonSearch>(this.nextPage).pipe(
      map((searchData: PokemonSearch) => {
        this.nextPage = searchData.next
        return searchData.results
      }),
      switchMap((dataResult: PokemonUrl[]) => {
        return dataResult.map(pokemon => {
          return this.httpClient.get<Pokemon>(pokemon.url)
        })
      }),
      mergeMap(result => result),
      toArray(),
      take(1)
    )
  };

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`${this.getByNameUrl}/${name}`)
  }
};
