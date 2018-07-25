import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  // here is the input for the component defined. it is the Person array for which the list is shown
  @Input('persons')
  private persons: Person[];

  // here is the OUTPUT for the component, when a person is asking to be edited this event handler
  // is going to be called
  @Output('edit')
  private editEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  // this method is called on every (click) of the edit button
  edit(p: Person) {
    // this method takes the emitter of the output and "emits" the person that the user requested to edit
    // see line #14 of the book.component.html (the book template), then in the APP Template this emitted
    // event (actually the person) is used to trigger the editedPerson=$event.clone()
    this.editEmitter.emit(p);
    return false;
  }
}
