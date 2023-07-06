import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  user: any;

  constructor(public sessionService: SessionService) {
    this.user = this.sessionService.getUser();
  }
}
