import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheByCapital.has(query)){
      return of(this.queryCacheByCapital.get(query)!)
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheByCapital.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error
            (`No country was found with the capital ${query}`));
        })
      )
  }

  searchByCountry(query: string) {
    const url = `${API_URL}/name/${query}`;

    query = query.toLowerCase();

    if(this.queryCacheByCountry.has(query)){
      return of(this.queryCacheByCountry.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheByCountry.set(query, countries)),
        delay(2000),
        catchError((error) => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error
            (`No country was found with the capital ${query}`));
        })
      )
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if(this.queryCacheByRegion.has(region)){
      return of(this.queryCacheByRegion.get(region) ?? []);
    }

    console.log(`Llegando al servidor por ${region}`);

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheByRegion.set(region, countries)),
        //delay(2000),
        catchError((error) => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error
            (`No country was found with the capital ${region}`));
        })
      )
  }

  searchByCountryByCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error
            (`No country was found with the codes ${code}`));
        })
      )
  }

}
