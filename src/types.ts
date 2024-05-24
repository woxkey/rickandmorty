export interface Location {
  name: string;
  url: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface CharactersResponse {
  info: Info;
  results: Character[];
}

export enum STATUS {
  ALL = "",
  ALIVE = "alive",
  DEAD = "dead",
  UNKNOWN = "unknown",
}
