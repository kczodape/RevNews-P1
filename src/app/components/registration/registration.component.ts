import { Users } from './../../users/users';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CREATE_USER } from 'src/app/gql/usersMutation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        contactNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }


  ngOnInit(): void {}

  isFieldInvalid(fieldName: string): boolean | any {
    const field = this.registrationForm.get(fieldName);
    return field?.invalid && field?.touched;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { firstName, lastName, age, contactNumber, email, country, password } = this.registrationForm.value;

      this.apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          firstName,
          lastName,
          age,
          contactNumber,
          email,
          country,
          password,
        },
        errorPolicy: 'all' 
      }).subscribe(
        (response) => {
          const user = (response.data as any)?.createUser;
          console.log(response.data);
          this.router.navigate(['/login']);
        },
        (error) => {
          const errorMessage = error.message;
          if (errorMessage === 'User with this email already exists') {
            this.showAlert = true;
            this.alertMessage = 'User with this email already exists';
          } else {
            this.showAlert = true;
            this.alertMessage = 'Registration failed';
          }
        }
      );
    }
  }
}
