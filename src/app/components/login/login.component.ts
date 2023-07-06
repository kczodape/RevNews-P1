import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from 'src/app/gql/usersLogin';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  isPasswordVisible = false;

  constructor(
    public apollo: Apollo,
    private router: Router,
    private sessionService: SessionService
  ) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    const variables = {
      variable: {
        email: this.email,
        password: this.password,
      },
    };
    this.apollo
      .watchQuery<any>({
        query: LOGIN_USER,
        variables,
      })
      .valueChanges.subscribe(
        (response) => {
          const user = response?.data?.allUsers[0];
          if (user) {
            console.log('Success');
            console.log(user);
            this.sessionService.setUser(user);
            this.sessionService.login();
            this.router.navigateByUrl('/index');
          } else {
            this.showAlert = true;
            this.alertMessage = 'Invalid credentials !';
            console.log('fail');
          }
        },
        (error) => {
          this.showAlert = true;
          this.alertMessage = 'Login failed';
        }
      );
  }
}
