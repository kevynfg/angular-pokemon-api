interface Stats {
  name: string;
  url: string;
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stats;
}

interface Type {
  name: string;
  url: string;
}

interface Sprites {
  back_female: string;
  back_shiny_female: string;
  back_default: string;
  front_female: string;
  front_shiny_female: string;
  back_shiny: string;
  front_default: string;
  front_shine: string;
}

interface PokemonTypes {
  slot: number;
  type: Type;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<PokemonTypes>;
  stats: Array<PokemonStats>;
  sprites: Sprites;
}
