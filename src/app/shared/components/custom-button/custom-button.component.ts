import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() link: string = ''; // Router link for navigation
  @Input() label: string = ''; // Button label
  @Input() iconPath: string = '';
  @Input() activeClass: string = 'btn-primary';
}
