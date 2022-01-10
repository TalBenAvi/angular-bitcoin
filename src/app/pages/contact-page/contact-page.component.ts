import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Observable, Subscription } from 'rxjs';

import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  contacts: Contact[];
  contacts$: Observable<Contact[]>;
  deleteCmp;
  contactId: string;
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.loadContacts();
    this.contacts$ = this.contactService.contacts$;
  }
  async removeContact(contactId: string) {
    this.contactId = contactId;
    const contact = await this.contactService
      .getContactById(this.contactId)
      .toPromise();
    this.deleteCmp = {
      title: `Delete  ${contact.name} from your contacts`,
      noBtn: 'Cancel',
      yesBtn: 'Delete',
    };
    console.log(contact);
  }
  remover(ans) {
    ans ? this.contactService.deleteContact(this.contactId) : '';
    this.contactId = '';
  }
}
