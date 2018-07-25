import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  // here we just need to declare the input to this component which is just
  // the person that we'll visualize and be able to edit
  @Input('person')
  private person: Person;

  // we define the two Outputs (the events)
  // one for store
  @Output('store')
  private storeEmitter: EventEmitter<any> = new EventEmitter();
  // and one for cancel
  @Output('cancel')
  private cancelEmitter: EventEmitter<any> = new EventEmitter();

  private newPhone: string = '';

  constructor() { }

  ngOnInit() { }

  // when the SAVE button is pressed this method is called/invoked
  storePerson() {
    // so it just emits the (store) event
    this.storeEmitter.emit( this.person );
  }

  // when the CANCEL button is pressed this method is called/invoked
  cancel() {
    // so it just emits the (store) event
    this.cancelEmitter.emit();
  }
}
