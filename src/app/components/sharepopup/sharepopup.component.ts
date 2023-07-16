import { Component, Inject, InjectionToken, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sharepopup',
  templateUrl: './sharepopup.component.html',
  styleUrls: ['./sharepopup.component.scss'],
})
export class SharepopupComponent {
  @Input() articleUrl: string | any;

  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { articleUrl: string },
  ) {
    this.articleUrl = data.articleUrl;
  }

  copyLink() {
    const dummyElement = document.createElement('textarea');
    document.body.appendChild(dummyElement);
    dummyElement.value = this.articleUrl;
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);

    this.snackBar.open('Link copied to clipboard!', '', {
      duration: 2000,
    });
  }
}
