import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeHolder = input('Search');

  value = output<string>();
  debounceTime = signal(300);

  inpuntValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inpuntValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
