// import { GetemailsService } from 'src/app/services/getemails.service';
import { Users } from './../../users/users';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CREATE_USER } from 'src/app/gql/usersMutation';
import { ArticleService } from 'src/app/services/article.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  geoLocation: any;
  public lowerCaseCountry: String | any;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private geoLocationService: GeolocationService,
    private articleService: ArticleService
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        contactNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  getErrorMessage(): string {
    const passwordControl = this.registrationForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password should be at least 6 characters long';
    }
    if (passwordControl?.hasError('pattern')) {
      return 'Password should contain at least one capital letter, one small letter, one number, and one special character';
    }
    return '';
  }

  ngOnInit(): void {
    this.geoLocationService.getLocation().subscribe((response) => {
      console.log(response);
      this.geoLocation = response;
      this.lowerCaseCountry = this.geoLocation?.country.toLowerCase();
      sessionStorage.setItem('selectedCountry', this.lowerCaseCountry);
      this.articleService.setSelectedCountry(this.lowerCaseCountry);
    });
  }

  // transformToLowerCase(obj: any): any {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return obj;
  //   }

  //   if (Array.isArray(obj)) {
  //     return obj.map((item) => this.transformToLowerCase(item));
  //   }

  //   const transformedObj: any = {};

  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       transformedObj[key.toLowerCase()] = this.transformToLowerCase(obj[key]);
  //     }
  //   }
  //   return transformedObj;
  // }

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

  isEmailExists(): boolean {
    const emailControl: AbstractControl | null =
      this.registrationForm.get('email');
    const email: string = emailControl?.value;
    const emailExists = false;
    return emailExists;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const {
        firstName,
        lastName,
        age,
        contactNumber,
        email,
        // country,
        password,
      } = this.registrationForm.value;

      this.apollo
        .mutate({
          mutation: CREATE_USER,
          variables: {
            firstName,
            lastName,
            age,
            contactNumber,
            email,
            // country,
            password,
          },
          errorPolicy: 'all',
        })
        .subscribe(
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
