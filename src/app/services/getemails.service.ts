import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS_EMAIL } from '../gql/usersEmail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetemailsService {
  constructor(private apollo: Apollo) {}

  getEmails() {
    this.apollo
      .query<any>({
        query: GET_USERS_EMAIL,
      })
      .subscribe(({ data }) => {
        console.log('Received data:', data);
        const emails = data?.allUsers.map((user: any) => user.email);
        console.log(emails);
      },
      (error) => {
        console.error('GraphQL query error:', error);
      });
  }
}
