import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";

@Component({
  selector: 'country-top-manu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-manu.component.html',
})
export class TopManuComponent { }
