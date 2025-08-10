export type Country = {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  subregion: string;
  region: string;
  population: number;
  demonym: string;
  nativeName: string;
  topLevelDomain: string[];
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    name: string;
  }[];
  borders?: string[];
};