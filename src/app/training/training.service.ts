import {Exercise} from './exercise.model';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs';
import {UIService} from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class TrainingService {

  private subscriptions: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch( new UI.StartLoading() );
    this.subscriptions.push( this.firestore.collection('availableExercises')
      .snapshotChanges()
      .pipe( map( (docArray) => {
        return docArray.map( document => {
          return {
            id: document.payload.doc.id,
            name: (document.payload.doc.data() as Exercise).name,
            calories: (document.payload.doc.data() as Exercise).calories,
            duration: (document.payload.doc.data() as Exercise).duration,
          };
        } );
      } ) )
      .subscribe( (exercises: Exercise[]) => {
        this.store.dispatch( new UI.StopLoading() );
        this.store.dispatch( new Training.SetAvailableTrainings(exercises) );
      }, (error => {
        this.store.dispatch( new UI.StopLoading() );
        this.uiService.showSnackBar('Fetching Exercises Failed...', null, 3000 );
      } ) ) );

  }

  startExercise( selectedId: string ) {
    this.store.dispatch( new Training.StartTraining( selectedId ) );
  }

  completeExercise() {
    this.store.select( fromTraining.getActiveTraining ).pipe( take(1) ).subscribe(exercise => {

      this.addDataToDatabase( {
        ...exercise,
        date: new Date(),
        state: 'complete'
      } );

      this.store.dispatch( new Training.StopTraining() );

    });

  }

  cancelExercise( progress: number ) {
    this.store.select( fromTraining.getActiveTraining ).pipe( take(1) ).subscribe( exercise => {

      this.addDataToDatabase( {
        ...exercise,
        duration: exercise.duration * ( progress / 100 ),
        calories: exercise.calories * ( progress / 100 ),
        date: new Date(),
        state: 'cancelled'
      } );

      this.store.dispatch( new Training.StopTraining() );

    });

  }

  fetchPastExercises() {
    this.subscriptions.push(
      this.firestore
        .collection('finishedExercises' )
        .valueChanges()
        .subscribe( (exercises: Exercise[]) => {
          this.store.dispatch( new Training.SetPastTrainings(exercises) );
        } )
    );
  }

  cancelSubscriptions() {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('finishedExercises' ).add( exercise ).then( null );
  }

}
