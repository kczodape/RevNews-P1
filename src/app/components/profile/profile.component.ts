import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { DELETE_USER } from 'src/app/gql/usersDelete';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { ResetdialogComponent } from '../resetdialog/resetdialog.component';
import { UpdatedialogComponent } from '../updatedialog/updatedialog.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any;

  constructor(
    public sessionService: SessionService,
    // private apollo: Apollo,
    // private router: Router,
    public dialog: MatDialog
  ) {
    this.user = this.sessionService.getUser();
    console.log('User object in ProfileComponent:', this.user);
  }

  // onDelete() {
  //   const variables = {
  //     id: this.user.id,
  //   };

  //   this.apollo
  //     .mutate({
  //       mutation: DELETE_USER,
  //       variables,
  //     })
  //     .subscribe(
  //       (response) => {
  //         console.log('User deleted');
  //         this.sessionService.clearUser();
  //         this.router.navigateByUrl('/');
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  // }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DeletedialogComponent, {
      width: '25%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogReset(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(ResetdialogComponent, {
      width: '25%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogUpdate(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(UpdatedialogComponent, {
      width: '25%',
      data: { ...this.user },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        // Update the user object with the updated values
        // this.user.firstName = updatedUser.firstName;
        // this.user.lastName = updatedUser.lastName;
        // this.user.age = updatedUser.age;
        // this.user.contactNumber = updatedUser.contactNumber;
        // this.user.email = updatedUser.email;
        // this.user.country = updatedUser.country;
        this.sessionService.setUser(updatedUser);
      }
      (error: any) => {
        console.log(error);
      };
    });
  }
}
