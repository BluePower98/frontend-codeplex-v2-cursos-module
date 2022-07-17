import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-autocomplete',
  templateUrl: './ng-autocomplete.component.html',
  styleUrls: ['./ng-autocomplete.component.scss']
})
export class NgAutocompleteComponent implements OnInit {

  keyword = 'name';
  data: any[] = [
    {
      id: 1,
      name: 'Estados unidos'
    },
    {
      id: 2,
      name: 'Inglaterra'
    },
    {
      id: 3,
      name: 'Alemania'
    },
    {
      id: 4,
      name: 'Suecia'
    },
    {
      id: 5,
      name: 'Suiza'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectEvent(item: any) {
    // do something with selected item

    console.log('selectEvent', item);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    console.log('onChangeSearch', { val });
  }

  onFocused(e: any) {
    // do something when input is focused

    console.log('onFocused', e);
  }

}
