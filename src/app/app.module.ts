import { SharepopupComponent } from './components/sharepopup/sharepopup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { IndexComponent } from './components/index/index.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeletedialogComponent } from './components/deletedialog/deletedialog.component';
import { ResetdialogComponent } from './components/resetdialog/resetdialog.component';
import { UpdatedialogComponent } from './components/updatedialog/updatedialog.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MatMenuModule } from '@angular/material/menu';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ResetPasswordService } from './services/reset-password.service';
import { SavedArticlesComponent } from './components/saved-articles/saved-articles.component';
import { SessionService } from './services/session.service';
import { FooterComponent } from './components/footer/footer.component';
import { ToogleComponent } from './components/toogle/toogle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LandingComponent,
    IndexComponent,
    ProfileComponent,
    NavbarComponent,
    DeletedialogComponent,
    ResetdialogComponent,
    UpdatedialogComponent,
    ArticlesComponent,
    SavedArticlesComponent,
    FooterComponent,
    ToogleComponent,
    SharepopupComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MatPaginatorModule,
    // TranslateModule.forRoot({
    //   loader:{
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [ResetPasswordService, SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
