import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../shared/ui.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading$: Observable<boolean>;

  maxDate: Date;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  onSubmit( form: NgForm ) {
    console.log(form);
    this.authService.registerUser( {
      email: form.value.email,
      password: form.value.password
    } );
  }

  ngOnInit() {

    this.isLoading$ = this.store.select( fromRoot.getIsLoading );

    this.maxDate = new Date();

    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );

  }

}
