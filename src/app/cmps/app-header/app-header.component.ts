import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @Output() selectedPage = new EventEmitter();
  // selectedPage = 'home';
  onSelectedPage(page: string) {
    this.selectedPage.emit(page);
  }
  ngOnInit(): void {}
  constructor() {}
}
