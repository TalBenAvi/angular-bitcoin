import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactFilter } from '../../models/contact.filter.model';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent {
  filterBy: ContactFilter;
  subscription: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.subscription = this.contactService.filterBy$.subscribe((filterBy) => {
      this.filterBy = filterBy;
    });
  }

  onSetFilter() {
    this.contactService.setFilter({ ...this.filterBy });
  }
}
