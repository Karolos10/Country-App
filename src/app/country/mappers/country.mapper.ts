import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper{

  static mapRestCountryToCountry(restCountry: RESTCountry): Country{
    return{
      capital: restCountry.capital.join(", "),
      cca2: restCountry.cca2,
      flag: restCountry.flags.svg,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      population: restCountry.population,

      region: restCountry.region,
      subRegion: restCountry.subregion,

      independent: restCountry.independent ? 'Yes' : 'No',
      continents: restCountry.continents.join(", "),
    }
  }

  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]): Country[]{
    return restCountries.map(this.mapRestCountryToCountry);
  }

}
