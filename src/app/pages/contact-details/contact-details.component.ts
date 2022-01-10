
import {ChangeDetectionStrategy,ChangeDetectorRef,Component,OnDestroy,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/user.model';
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact;
  subscription: Subscription;
  userSubscription: Subscription;
  moves: Move[];
  loggingUser;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}


  async ngOnInit(): Promise<void> {
    this.subscription = this.route.params.subscribe(async (params) => {
      const contact = await this.contactService
        .getContactById(params['id'])
        .toPromise();
      this.contact = contact;
      this.cd.markForCheck();
    });
    this.userSubscription = this.userService.user$.subscribe(async (user) => {
      await this.setMoves();
      this.cd.markForCheck();
    });
  }
  async setMoves() {
    this.loggingUser = await this.userService.getUser().toPromise();
    this.moves = this.loggingUser.moves.filter(
      (m) => m.to === this.contact.name
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addMove(move) {
    this.userService.addMove(move);
  }
}
