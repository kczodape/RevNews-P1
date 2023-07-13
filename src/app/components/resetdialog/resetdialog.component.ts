import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { SessionService } from 'src/app/services/session.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resetdialog',
  templateUrl: './resetdialog.component.html',
  styleUrls: ['./resetdialog.component.scss'],
})
export class ResetdialogComponent {
  Router(Router: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  ResetPasswordService(ResetPasswordService: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  email: string | any;
  user: any;
  dbPassword: string | any;
  oldPassword: string | any;
  newPassword: string | any;

  @ViewChild('resetForm', { static: false }) resetForm: NgForm | any;

  constructor(
    public resetPasswordService: ResetPasswordService,
    private sessionService: SessionService,
    public router: Router,
    public dialogRef: MatDialogRef<ResetdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.sessionService.getUser();
    console.log(this?.user);
    this.dbPassword = this.user?.password;
    console.log(this.dbPassword);
  }

  reset() {
    if (this.oldPassword === this.dbPassword) {
      this.resetPasswordService
        .resetPassword(this.user.id, this.newPassword)
        .subscribe(
          (response: any) => {
            console.log('Password reset successfully:', response);
            this.resetForm.resetForm();
            this.router.navigateByUrl('/index');
            alert('Password reset successfully');
            this.dialogRef.close();
          },
          (error: any) => {
            console.error('Password reset failed:', error);
          }
        );
    } else {
      alert('Password does not match');
    }
  }
}
