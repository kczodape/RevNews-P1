import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { DELETE_USER } from 'src/app/gql/usersDelete';
import { SessionService } from 'src/app/services/session.service';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss'],
})
export class DeletedialogComponent {
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  user: any;

  constructor(
    public dialogRef: MatDialogRef<DeletedialogComponent>,
    public sessionService: SessionService,
    private apollo: Apollo,
    private router: Router
  ) {
    this.user = this.sessionService.getUser();
  }

  onDelete() {
    const variables = {
      id: this.user.id,
    };

    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables,
      })
      .subscribe(
        (response) => {
          console.log('User deleted');
          this.sessionService.clearUser();
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error(error);
        }
      );
  }
  
}
