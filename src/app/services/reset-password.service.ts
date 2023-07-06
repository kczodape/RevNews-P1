import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

const RESET_PASSWORD_MUTATION = gql`
mutation RestePassword($email: String!, $oldPassWord: String!, $newPassWord: String!){
  resetPassword(email: $email, oldPassword: $oldPassWord, newPassWord: $newPassWord){
    id
    email
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private apollo: Apollo) { }

  resetPassword(email: string, oldPassword: string, newPassword: string) {
    return this.apollo.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: { email, oldPassword, newPassword },
    });
  }
}
