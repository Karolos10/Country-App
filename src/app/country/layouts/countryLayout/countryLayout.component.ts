import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopManuComponent } from "../../components/top-manu/top-manu.component";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopManuComponent],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent { }
