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
import { ResetPasswordService } from './services/reset-password.service';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MatPaginatorModule ,
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
  ],
  providers: [ResetPasswordService],
  bootstrap: [AppComponent],
})
export class AppModule {}
