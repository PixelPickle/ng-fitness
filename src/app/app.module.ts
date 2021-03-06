import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavComponent} from './navigation/sidenav/sidenav.component';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {environment} from '../environments/environment';
import {UIService} from './shared/ui.service';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot( reducers ),
    SharedModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
