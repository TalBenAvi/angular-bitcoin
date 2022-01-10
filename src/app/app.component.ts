import { Component, Input } from '@angular/core';
import { UserMsgService } from './service/user.msg.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mister-BITCoin';
  selectedContactId: string = '';

  constructor(private userMsg: UserMsgService) {}
  msg: string = '';

  ngOnInit(): void {
    this.userMsg.userMsg$.subscribe((msg) => {
      this.msg = msg;
    });
  }
  closeModel() {
    this.msg = '';
  }
}
