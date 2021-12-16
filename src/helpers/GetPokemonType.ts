export class GetPokemonType {

  getPokemonType = (PokemonType: string): string | null => {
    const types = {
      bug: '#aacf4e',
      poison: '#91288d',
      flying: '#c2b7d9',
      fire: '#f7941f',
      rock: '#c2b7d9',
      ground: '#ffcc69',
      water: '#00aeed',
      grass: '#35b44b',
      dark: '#35b44b',
      ghost: '#877299',
      normal: '#c3b59b',
      dragon: '#4d2f8f',
      electric: '#faeb30',
      fairy: '#f392bd',
      fighting: '#bc1e2c',
      ice: '#a3dcf7',
      psychic: '#ec2b7a',
      steel: '#a1abb4'
    }

    let selectedType: string = '';
    Object.entries(types).map(([key, value]) => {
      if (key.includes(PokemonType)) selectedType = value;
        return null
    })

    return selectedType || null
  }
}
