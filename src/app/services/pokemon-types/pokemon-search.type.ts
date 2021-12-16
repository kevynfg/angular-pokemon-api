export interface PokemonUrl {
  name: string,
  url: string
};

export interface PokemonSearch {
  count: number,
  next: string,
  previous: string,
  results : PokemonUrl[]
};
