import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-resetdialog',
  templateUrl: './resetdialog.component.html',
  styleUrls: ['./resetdialog.component.scss'],
})
export class ResetdialogComponent {
  email: string | any;
  oldPassword: string | any;
  newPassword: string | any;
  constructor(private resetPasswordService: ResetPasswordService){}
  reset() {
    // Call the resetPassword service method and pass the form values
    this.resetPasswordService
      .resetPassword(this.email, this.oldPassword, this.newPassword)
      .subscribe(
        (response) => {
          // Reset password success, handle the response
          console.log('Password reset successful:', response);
        },
        (error) => {
          // Reset password failed, handle the error
          console.error('Password reset failed:', error);
        }
      );
  }
}
