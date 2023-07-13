import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { UPDATE_USER } from 'src/app/gql/usersUpdate';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-updatedialog',
  templateUrl: './updatedialog.component.html',
  styleUrls: ['./updatedialog.component.scss'],
})
export class UpdatedialogComponent {
  user: any;
  formData: any;

  constructor(
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<UpdatedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apollo: Apollo
  ) {
    this.user = this.sessionService.getUser();
    this.formData = { ...data };
  }
  update(): void {
    const { id, firstName, lastName, age, contactNumber, email /*country*/ } =
      this.formData;
    this.data.id = id;

    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id,
          firstName,
          lastName,
          age,
          contactNumber,
          email,
          // country,
        },
      })
      .subscribe(
        (response) => {
          const updatedUser = (response.data as any).updateUser;
          console.log('User updated', updatedUser);
          this.dialogRef.close(updatedUser);
          this.sessionService.setUser(updatedUser);
          alert('Your profile updated successfully');
        },
        (error) => {
          console.error('Failed to update user', error);
        }
      );
  }

  close(): void {
    this.dialogRef.close();
  }
}
